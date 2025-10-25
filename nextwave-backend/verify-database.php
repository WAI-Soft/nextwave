<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

echo "=================================\n";
echo "Database Verification\n";
echo "=================================\n\n";

try {
    $projectCount = \App\Models\Project::count();
    $adminCount = \App\Models\Admin::count();
    $publishedCount = \App\Models\Project::where('is_published', 1)->count();
    
    echo "✓ Projects in database: $projectCount\n";
    echo "✓ Admins in database: $adminCount\n";
    echo "✓ Published projects: $publishedCount\n\n";
    
    if ($projectCount > 0) {
        echo "Sample Projects:\n";
        echo "----------------\n";
        $projects = \App\Models\Project::take(5)->get(['id', 'title_en', 'service_category', 'client', 'year']);
        foreach ($projects as $project) {
            echo "- [{$project->id}] {$project->title_en} ({$project->service_category}) - {$project->client} - {$project->year}\n";
        }
    }
    
    echo "\n✓ Database is working correctly!\n";
    
} catch (\Exception $e) {
    echo "✗ Error: " . $e->getMessage() . "\n";
    exit(1);
}
