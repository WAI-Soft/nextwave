<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Testing database connection...\n";

$dbPath = __DIR__ . '/database/database.sqlite';
echo "Database path: " . $dbPath . "\n";
echo "File exists: " . (file_exists($dbPath) ? 'Yes' : 'No') . "\n";

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Database connection successful!\n";
    
    // Check if projects table exists
    $stmt = $pdo->query("SELECT name FROM sqlite_master WHERE type='table' AND name='projects'");
    $table = $stmt->fetch();
    
    if ($table) {
        echo "Projects table exists!\n";
        
        // Get table structure
        $stmt = $pdo->query("PRAGMA table_info(projects)");
        $columns = $stmt->fetchAll();
        echo "Table columns:\n";
        foreach ($columns as $column) {
            echo "- " . $column['name'] . " (" . $column['type'] . ")\n";
        }
        
        // Count projects
        $stmt = $pdo->query("SELECT COUNT(*) as count FROM projects");
        $count = $stmt->fetch();
        echo "Number of projects: " . $count['count'] . "\n";
        
    } else {
        echo "Projects table does not exist!\n";
    }
    
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}

echo "\nTesting API routing...\n";
$_SERVER['REQUEST_URI'] = '/api/v1/projects';
$_SERVER['REQUEST_METHOD'] = 'GET';

$requestPath = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$route = str_replace('/api/v1', '', $requestPath);
echo "Route: " . $route . "\n";

?>