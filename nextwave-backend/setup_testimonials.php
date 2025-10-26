<?php

// Database connection
$db_path = __DIR__ . '/database/database.sqlite';

try {
    $pdo = new PDO("sqlite:$db_path");
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    echo "Connected to SQLite database successfully.\n";
    
    // Create testimonials table
    $createTableSQL = "
    CREATE TABLE IF NOT EXISTS testimonials (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name_en TEXT NOT NULL,
        name_ar TEXT NOT NULL,
        position_en TEXT NOT NULL,
        position_ar TEXT NOT NULL,
        company_en TEXT NOT NULL,
        company_ar TEXT NOT NULL,
        content_en TEXT NOT NULL,
        content_ar TEXT NOT NULL,
        rating INTEGER NOT NULL DEFAULT 5,
        image_url TEXT,
        is_featured BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )";
    
    $pdo->exec($createTableSQL);
    echo "Testimonials table created successfully.\n";
    
    // Check if testimonials already exist
    $stmt = $pdo->query("SELECT COUNT(*) FROM testimonials");
    $count = $stmt->fetchColumn();
    
    if ($count == 0) {
        // Insert sample testimonials
        $insertSQL = "
        INSERT INTO testimonials (name_en, name_ar, position_en, position_ar, company_en, company_ar, content_en, content_ar, rating, is_featured) VALUES
        ('Sarah Johnson', 'سارة جونسون', 'Marketing Director', 'مديرة التسويق', 'Tech Solutions Inc.', 'شركة الحلول التقنية', 'NextWave delivered an exceptional website that exceeded our expectations. Their attention to detail and creative approach made all the difference.', 'قدمت نكست ويف موقعاً إلكترونياً استثنائياً فاق توقعاتنا. اهتمامهم بالتفاصيل ونهجهم الإبداعي أحدث فرقاً كبيراً.', 5, 1),
        ('Ahmed Al-Rashid', 'أحمد الراشد', 'CEO', 'الرئيس التنفيذي', 'Digital Innovations', 'الابتكارات الرقمية', 'Working with NextWave was a game-changer for our business. Their professional team delivered outstanding results on time and within budget.', 'العمل مع نكست ويف كان نقطة تحول لأعمالنا. فريقهم المحترف قدم نتائج متميزة في الوقت المحدد وضمن الميزانية.', 5, 1),
        ('Maria Rodriguez', 'ماريا رودريغيز', 'Brand Manager', 'مديرة العلامة التجارية', 'Creative Studios', 'الاستوديوهات الإبداعية', 'The branding work NextWave did for us was phenomenal. They truly understood our vision and brought it to life beautifully.', 'عمل العلامة التجارية الذي قامت به نكست ويف كان رائعاً. لقد فهموا رؤيتنا حقاً وأحيوها بشكل جميل.', 5, 1),
        ('Omar Hassan', 'عمر حسان', 'Product Manager', 'مدير المنتج', 'StartupXYZ', 'شركة ستارت أب', 'NextWave developed our mobile app with incredible precision. The user experience is smooth and the design is modern and intuitive.', 'طورت نكست ويف تطبيقنا المحمول بدقة لا تصدق. تجربة المستخدم سلسة والتصميم عصري وبديهي.', 5, 0),
        ('Lisa Chen', 'ليزا تشين', 'Operations Director', 'مديرة العمليات', 'Global Enterprises', 'المؤسسات العالمية', 'Their photography services captured our products perfectly. The quality and creativity of their work is unmatched.', 'خدمات التصوير الخاصة بهم التقطت منتجاتنا بشكل مثالي. جودة وإبداع عملهم لا مثيل له.', 4, 0)";
        
        $pdo->exec($insertSQL);
        echo "Sample testimonials inserted successfully.\n";
        echo "Total testimonials: 5\n";
    } else {
        echo "Testimonials table already contains data ($count records).\n";
    }
    
    // Display current testimonials
    echo "\nCurrent testimonials in database:\n";
    $stmt = $pdo->query("SELECT id, name_en, company_en, rating, is_featured FROM testimonials ORDER BY id");
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $featured = $row['is_featured'] ? ' (Featured)' : '';
        echo "- ID: {$row['id']}, Name: {$row['name_en']}, Company: {$row['company_en']}, Rating: {$row['rating']}/5{$featured}\n";
    }
    
} catch (PDOException $e) {
    echo "Database error: " . $e->getMessage() . "\n";
    exit(1);
}

echo "\nTestimonials database setup completed successfully!\n";
?>