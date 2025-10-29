<?php

namespace App\Http\Controllers;

use App\Models\Project;
use App\Http\Resources\ProjectResource;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of published projects (Public endpoint).
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function index(Request $request)
    {
        $query = Project::published();

        // Filter by category if provided
        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        // Filter by year if provided
        if ($request->has('year')) {
            $query->where('year', $request->year);
        }

        $projects = $query->orderBy('created_at', 'desc')->get();

        return ProjectResource::collection($projects);
    }

    /**
     * Display the specified project (Public endpoint).
     *
     * @param Project $project
     * @return ProjectResource
     */
    public function show(Project $project): ProjectResource
    {
        // Only show published projects for public endpoint
        if (!$project->is_published) {
            abort(404);
        }

        return new ProjectResource($project);
    }

    /**
     * Store a newly created project (Admin endpoint).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        \Log::info('Store method called', ['data' => $request->all()]);
        
        $validator = Validator::make($request->all(), [
            'title_en' => 'required|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'description_en' => 'required|string',
            'description_ar' => 'nullable|string',
            'service_category' => 'required|string|in:branding,websites,advertising,logos,photography',
            'client' => 'nullable|string|max:255',
            'year' => 'nullable|integer|min:1900|max:' . (date('Y') + 10),
            'image_path' => 'nullable|string',
            'video_path' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $project = Project::create($validator->validated());

        return response()->json([
            'message' => 'Project created successfully',
            'data' => new ProjectResource($project),
        ], 201);
    }

    /**
     * Update the specified project (Admin endpoint).
     *
     * @param Request $request
     * @param string|int $project
     * @return JsonResponse
     */
    public function update(Request $request, $project): JsonResponse
    {
        // Find the project by ID
        $projectModel = Project::find($project);
        
        if (!$projectModel) {
            return response()->json([
                'message' => 'Project not found',
            ], 404);
        }
        
        $validator = Validator::make($request->all(), [
            'title_en' => 'sometimes|string|max:255',
            'title_ar' => 'nullable|string|max:255',
            'description_en' => 'sometimes|string',
            'description_ar' => 'nullable|string',
            'service_category' => 'sometimes|string|in:branding,websites,advertising,logos,photography',
            'client' => 'nullable|string|max:255',
            'year' => 'nullable|integer|min:1900|max:' . (date('Y') + 10),
            'image_path' => 'nullable|string',
            'video_path' => 'nullable|string',
            'is_published' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $projectModel->update($validator->validated());

        return response()->json([
            'message' => 'Project updated successfully',
            'data' => new ProjectResource($projectModel),
        ], 200);
    }

    /**
     * Remove the specified project (Admin endpoint).
     *
     * @param string|int $project
     * @return JsonResponse
     */
    public function destroy($project): JsonResponse
    {
        // Find the project by ID
        $projectModel = Project::find($project);
        
        if (!$projectModel) {
            return response()->json([
                'message' => 'Project not found',
            ], 404);
        }
        
        // Delete associated media files
        if ($projectModel->image_path && Storage::disk('public')->exists($projectModel->image_path)) {
            Storage::disk('public')->delete($projectModel->image_path);
        }

        if ($projectModel->video_path && Storage::disk('public')->exists($projectModel->video_path)) {
            Storage::disk('public')->delete($projectModel->video_path);
        }

        $projectModel->delete();

        return response()->json([
            'message' => 'Project deleted successfully',
        ], 200);
    }

    /**
     * Get all projects including unpublished ones (Admin endpoint).
     *
     * @param Request $request
     * @return \Illuminate\Http\Resources\Json\AnonymousResourceCollection
     */
    public function adminIndex(Request $request)
    {
        $query = Project::query();

        // Filter by category if provided
        if ($request->has('category')) {
            $query->byCategory($request->category);
        }

        // Filter by published status if provided
        if ($request->has('published')) {
            $query->where('is_published', $request->boolean('published'));
        }

        // Filter by year if provided
        if ($request->has('year')) {
            $query->where('year', $request->year);
        }

        $projects = $query->orderBy('created_at', 'desc')->get();

        return ProjectResource::collection($projects);
    }
}