<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\TestimonialController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Public routes
Route::prefix('v1')->group(function () {
    // Public project routes
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/{project}', [ProjectController::class, 'show']);
    
    // Public testimonial routes
    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::get('/testimonials/{testimonial}', [TestimonialController::class, 'show']);
    
    // Contact form submission
    Route::post('/contact', [ContactController::class, 'submit']);
});

// Admin authentication routes
Route::prefix('v1/admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    
    // TEMPORARY: Admin routes without authentication for development
    // TODO: Re-enable auth:sanctum middleware in production
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    
    // Admin project management
    Route::get('/projects', [ProjectController::class, 'adminIndex']);
    Route::post('/projects', function (Illuminate\Http\Request $request) {
        \Log::info('POST /projects called', ['data' => $request->all()]);
        
        try {
            $project = \App\Models\Project::create([
                'title_en' => $request->input('title_en'),
                'title_ar' => $request->input('title_ar', ''),
                'description_en' => $request->input('description_en'),
                'description_ar' => $request->input('description_ar', ''),
                'service_category' => $request->input('service_category'),
                'client' => $request->input('client'),
                'year' => $request->input('year'),
                'image_path' => $request->input('image_path'),
                'is_published' => $request->input('is_published', true),
            ]);
            
            \Log::info('Project created', ['id' => $project->id]);
            
            return response()->json([
                'message' => 'Project created successfully',
                'data' => $project,
            ], 201);
        } catch (\Exception $e) {
            \Log::error('Failed to create project', ['error' => $e->getMessage()]);
            return response()->json([
                'message' => 'Failed to create project',
                'error' => $e->getMessage()
            ], 500);
        }
    });
    Route::match(['put', 'patch'], '/projects/{project}', [ProjectController::class, 'update']);
    Route::delete('/projects/{project}', [ProjectController::class, 'destroy']);
    
    // Admin testimonial management
    Route::get('/testimonials', [TestimonialController::class, 'adminIndex']);
    Route::post('/testimonials', [TestimonialController::class, 'store']);
    Route::put('/testimonials/{testimonial}', [TestimonialController::class, 'update']);
    Route::delete('/testimonials/{testimonial}', [TestimonialController::class, 'destroy']);
    
    // Media management
    Route::post('/upload', [MediaController::class, 'upload']);
    Route::delete('/media', [MediaController::class, 'delete']);
    Route::get('/media/info', [MediaController::class, 'info']);
});

// Health check route
Route::get('/health', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now(),
        'version' => '1.0.0',
    ]);
});

// Test route
Route::post('/test-create', function (Illuminate\Http\Request $request) {
    \Log::info('Test route called', ['data' => $request->all()]);
    return response()->json([
        'message' => 'Test successful',
        'data' => $request->all()
    ]);
});

// Fallback route for API
Route::fallback(function () {
    return response()->json([
        'message' => 'API endpoint not found',
        'status' => 404,
    ], 404);
});
