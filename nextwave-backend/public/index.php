<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3002');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Database configuration
$dbPath = __DIR__ . '/../database/database.sqlite';

// Initialize database connection
try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// Parse the request
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestPath = parse_url($requestUri, PHP_URL_PATH);

// Remove base path and get route
$route = str_replace('/api/v1', '', $requestPath);

// Get request body for POST/PUT requests
$input = json_decode(file_get_contents('php://input'), true);

// Simple routing
switch ($route) {
    case '/projects':
        if ($requestMethod === 'GET') {
            getPublicProjects($pdo);
        } elseif ($requestMethod === 'POST') {
            createProject($pdo, $input);
        }
        break;
        
    case (preg_match('/^\/projects\/(\d+)$/', $route, $matches) ? true : false):
        $projectId = $matches[1];
        if ($requestMethod === 'GET') {
            getProject($pdo, $projectId);
        } elseif ($requestMethod === 'PUT') {
            updateProject($pdo, $projectId, $input);
        } elseif ($requestMethod === 'DELETE') {
            deleteProject($pdo, $projectId);
        }
        break;
        
    case '/admin/projects':
        if ($requestMethod === 'GET') {
            getAdminProjects($pdo);
        } elseif ($requestMethod === 'POST') {
            createProject($pdo, $input);
        }
        break;
        
    case (preg_match('/^\/admin\/projects\/(\d+)$/', $route, $matches) ? true : false):
        $projectId = $matches[1];
        if ($requestMethod === 'PUT' || $requestMethod === 'PATCH') {
            updateProject($pdo, $projectId, $input);
        } elseif ($requestMethod === 'DELETE') {
            deleteProject($pdo, $projectId);
        }
        break;
        
    case '/admin/login':
        if ($requestMethod === 'POST') {
            adminLogin($pdo, $input);
        }
        break;
        
    case '/testimonials':
        if ($requestMethod === 'GET') {
            getPublicTestimonials($pdo);
        } elseif ($requestMethod === 'POST') {
            createTestimonial($pdo, $input);
        }
        break;
        
    case (preg_match('/^\/testimonials\/(\d+)$/', $route, $matches) ? true : false):
        $testimonialId = $matches[1];
        if ($requestMethod === 'GET') {
            getTestimonial($pdo, $testimonialId);
        } elseif ($requestMethod === 'PUT') {
            updateTestimonial($pdo, $testimonialId, $input);
        } elseif ($requestMethod === 'DELETE') {
            deleteTestimonial($pdo, $testimonialId);
        }
        break;
        
    case '/admin/testimonials':
        if ($requestMethod === 'GET') {
            getAdminTestimonials($pdo);
        } elseif ($requestMethod === 'POST') {
            createTestimonial($pdo, $input);
        }
        break;
        
    case (preg_match('/^\/admin\/testimonials\/(\d+)$/', $route, $matches) ? true : false):
        $testimonialId = $matches[1];
        if ($requestMethod === 'PUT' || $requestMethod === 'PATCH') {
            updateTestimonial($pdo, $testimonialId, $input);
        } elseif ($requestMethod === 'DELETE') {
            deleteTestimonial($pdo, $testimonialId);
        }
        break;
        
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Route not found']);
        break;
}

// Functions
function getPublicProjects($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE is_published = 1 ORDER BY created_at DESC");
        $stmt->execute();
        $projects = $stmt->fetchAll();
        
        echo json_encode(['data' => $projects]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch projects: ' . $e->getMessage()]);
    }
}

function getAdminProjects($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM projects ORDER BY created_at DESC");
        $stmt->execute();
        $projects = $stmt->fetchAll();
        
        echo json_encode(['data' => $projects]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch projects: ' . $e->getMessage()]);
    }
}

function getProject($pdo, $id) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ? AND is_published = 1");
        $stmt->execute([$id]);
        $project = $stmt->fetch();
        
        if ($project) {
            echo json_encode(['data' => $project]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Project not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch project: ' . $e->getMessage()]);
    }
}

function createProject($pdo, $data) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO projects (title_en, title_ar, description_en, description_ar, service_category, client, year, image_path, video_path, is_published, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        ");
        
        $stmt->execute([
            $data['title_en'] ?? '',
            $data['title_ar'] ?? '',
            $data['description_en'] ?? '',
            $data['description_ar'] ?? '',
            $data['service_category'] ?? '',
            $data['client'] ?? '',
            $data['year'] ?? null,
            $data['image_path'] ?? null,
            $data['video_path'] ?? null,
            $data['is_published'] ?? 0
        ]);
        
        $projectId = $pdo->lastInsertId();
        
        // Fetch the created project
        $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
        $stmt->execute([$projectId]);
        $project = $stmt->fetch();
        
        http_response_code(201);
        echo json_encode(['message' => 'Project created successfully', 'data' => $project]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create project: ' . $e->getMessage()]);
    }
}

function updateProject($pdo, $id, $data) {
    try {
        $stmt = $pdo->prepare("
            UPDATE projects 
            SET title_en = ?, title_ar = ?, description_en = ?, description_ar = ?, 
                service_category = ?, client = ?, year = ?, image_path = ?, 
                video_path = ?, is_published = ?, updated_at = datetime('now')
            WHERE id = ?
        ");
        
        $stmt->execute([
            $data['title_en'] ?? '',
            $data['title_ar'] ?? '',
            $data['description_en'] ?? '',
            $data['description_ar'] ?? '',
            $data['service_category'] ?? '',
            $data['client'] ?? '',
            $data['year'] ?? null,
            $data['image_path'] ?? null,
            $data['video_path'] ?? null,
            $data['is_published'] ?? 0,
            $id
        ]);
        
        if ($stmt->rowCount() > 0) {
            // Fetch the updated project
            $stmt = $pdo->prepare("SELECT * FROM projects WHERE id = ?");
            $stmt->execute([$id]);
            $project = $stmt->fetch();
            
            echo json_encode(['message' => 'Project updated successfully', 'data' => $project]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Project not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update project: ' . $e->getMessage()]);
    }
}

function deleteProject($pdo, $id) {
    try {
        $stmt = $pdo->prepare("DELETE FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Project deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Project not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete project: ' . $e->getMessage()]);
    }
}

function adminLogin($pdo, $data) {
    // Simple admin login - in production, use proper authentication
    $email = $data['email'] ?? '';
    $password = $data['password'] ?? '';
    
    if ($email === 'admin@nextwave.com' && $password === 'admin123') {
        echo json_encode([
            'message' => 'Login successful',
            'token' => 'simple-admin-token',
            'admin' => [
                'id' => 1,
                'name' => 'Admin',
                'email' => 'admin@nextwave.com'
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(['error' => 'Invalid credentials']);
    }
}

// Testimonials Functions
function getPublicTestimonials($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM testimonials ORDER BY is_featured DESC, created_at DESC");
        $stmt->execute();
        $testimonials = $stmt->fetchAll();
        
        echo json_encode(['data' => $testimonials]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch testimonials: ' . $e->getMessage()]);
    }
}

function getAdminTestimonials($pdo) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM testimonials ORDER BY created_at DESC");
        $stmt->execute();
        $testimonials = $stmt->fetchAll();
        
        echo json_encode(['data' => $testimonials]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch testimonials: ' . $e->getMessage()]);
    }
}

function getTestimonial($pdo, $id) {
    try {
        $stmt = $pdo->prepare("SELECT * FROM testimonials WHERE id = ?");
        $stmt->execute([$id]);
        $testimonial = $stmt->fetch();
        
        if ($testimonial) {
            echo json_encode(['data' => $testimonial]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Testimonial not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to fetch testimonial: ' . $e->getMessage()]);
    }
}

function createTestimonial($pdo, $data) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO testimonials (name_en, name_ar, position_en, position_ar, company_en, company_ar, content_en, content_ar, rating, image_url, is_featured, created_at, updated_at) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
        ");
        
        $stmt->execute([
            $data['name_en'] ?? '',
            $data['name_ar'] ?? '',
            $data['position_en'] ?? '',
            $data['position_ar'] ?? '',
            $data['company_en'] ?? '',
            $data['company_ar'] ?? '',
            $data['content_en'] ?? '',
            $data['content_ar'] ?? '',
            $data['rating'] ?? 5,
            $data['image_url'] ?? null,
            $data['is_featured'] ?? 0
        ]);
        
        $testimonialId = $pdo->lastInsertId();
        
        // Fetch the created testimonial
        $stmt = $pdo->prepare("SELECT * FROM testimonials WHERE id = ?");
        $stmt->execute([$testimonialId]);
        $testimonial = $stmt->fetch();
        
        http_response_code(201);
        echo json_encode(['message' => 'Testimonial created successfully', 'data' => $testimonial]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to create testimonial: ' . $e->getMessage()]);
    }
}

function updateTestimonial($pdo, $id, $data) {
    try {
        $stmt = $pdo->prepare("
            UPDATE testimonials 
            SET name_en = ?, name_ar = ?, position_en = ?, position_ar = ?, 
                company_en = ?, company_ar = ?, content_en = ?, content_ar = ?, 
                rating = ?, image_url = ?, is_featured = ?, updated_at = datetime('now')
            WHERE id = ?
        ");
        
        $stmt->execute([
            $data['name_en'] ?? '',
            $data['name_ar'] ?? '',
            $data['position_en'] ?? '',
            $data['position_ar'] ?? '',
            $data['company_en'] ?? '',
            $data['company_ar'] ?? '',
            $data['content_en'] ?? '',
            $data['content_ar'] ?? '',
            $data['rating'] ?? 5,
            $data['image_url'] ?? null,
            $data['is_featured'] ?? 0,
            $id
        ]);
        
        if ($stmt->rowCount() > 0) {
            // Fetch the updated testimonial
            $stmt = $pdo->prepare("SELECT * FROM testimonials WHERE id = ?");
            $stmt->execute([$id]);
            $testimonial = $stmt->fetch();
            
            echo json_encode(['message' => 'Testimonial updated successfully', 'data' => $testimonial]);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Testimonial not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to update testimonial: ' . $e->getMessage()]);
    }
}

function deleteTestimonial($pdo, $id) {
    try {
        $stmt = $pdo->prepare("DELETE FROM testimonials WHERE id = ?");
        $stmt->execute([$id]);
        
        if ($stmt->rowCount() > 0) {
            echo json_encode(['message' => 'Testimonial deleted successfully']);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Testimonial not found']);
        }
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to delete testimonial: ' . $e->getMessage()]);
    }
}
?>