<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "=================================\n";
echo "Testimonials Database Check\n";
echo "=================================\n\n";

try {
    $count = \App\Models\Testimonial::count();
    echo "✓ Testimonials in database: $count\n\n";
    
    if ($count > 0) {
        echo "Sample Testimonials:\n";
        echo "-------------------\n";
        $testimonials = \App\Models\Testimonial::take(3)->get(['id', 'name', 'role', 'rating', 'is_published']);
        foreach ($testimonials as $testimonial) {
            $status = $testimonial->is_published ? 'Published' : 'Draft';
            echo "- [{$testimonial->id}] {$testimonial->name} - {$testimonial->role} ({$testimonial->rating}★) - {$status}\n";
        }
    } else {
        echo "⚠ No testimonials found. Run: php artisan db:seed --class=TestimonialSeeder\n";
    }
    
    echo "\n✓ Database connection working!\n";
    
} catch (\Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    exit(1);
}
