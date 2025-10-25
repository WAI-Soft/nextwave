<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "Setting up database...\n";

$dbPath = __DIR__ . '/database/database.sqlite';

try {
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Create projects table
    $sql = "
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title_en TEXT NOT NULL,
        title_ar TEXT NOT NULL,
        description_en TEXT NOT NULL,
        description_ar TEXT NOT NULL,
        service_category TEXT NOT NULL,
        client TEXT,
        year INTEGER,
        image_path TEXT,
        video_path TEXT,
        is_published INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($sql);
    echo "Projects table created successfully!\n";
    
    // Insert some sample data
    $sampleProjects = [
        [
            'title_en' => 'E-commerce Website',
            'title_ar' => 'موقع التجارة الإلكترونية',
            'description_en' => 'A modern e-commerce platform with advanced features',
            'description_ar' => 'منصة تجارة إلكترونية حديثة مع ميزات متقدمة',
            'service_category' => 'Web Development',
            'client' => 'Tech Corp',
            'year' => 2024,
            'is_published' => 1
        ],
        [
            'title_en' => 'Mobile App Design',
            'title_ar' => 'تصميم تطبيق الهاتف المحمول',
            'description_en' => 'User-friendly mobile application design',
            'description_ar' => 'تصميم تطبيق هاتف محمول سهل الاستخدام',
            'service_category' => 'Mobile Development',
            'client' => 'StartupXYZ',
            'year' => 2024,
            'is_published' => 1
        ]
    ];
    
    $stmt = $pdo->prepare("
        INSERT INTO projects (title_en, title_ar, description_en, description_ar, service_category, client, year, is_published) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ");
    
    foreach ($sampleProjects as $project) {
        $stmt->execute([
            $project['title_en'],
            $project['title_ar'],
            $project['description_en'],
            $project['description_ar'],
            $project['service_category'],
            $project['client'],
            $project['year'],
            $project['is_published']
        ]);
    }
    
    echo "Sample projects inserted successfully!\n";
    
    // Verify the data
    $stmt = $pdo->query("SELECT COUNT(*) as count FROM projects");
    $count = $stmt->fetch();
    echo "Total projects in database: " . $count['count'] . "\n";
    
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
}
?>