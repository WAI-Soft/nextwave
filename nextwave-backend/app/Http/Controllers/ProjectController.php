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
        $validator = Validator::make($request->all(), [
            'title_en' => 'required|string|max:255',
            'title_ar' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_ar' => 'required|string',
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
            'project' => new ProjectResource($project),
        ], 201);
    }

    /**
     * Update the specified project (Admin endpoint).
     *
     * @param Request $request
     * @param Project $project
     * @return JsonResponse
     */
    public function update(Request $request, Project $project): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'title_en' => 'sometimes|required|string|max:255',
            'title_ar' => 'sometimes|required|string|max:255',
            'description_en' => 'sometimes|required|string',
            'description_ar' => 'sometimes|required|string',
            'service_category' => 'sometimes|required|string|in:branding,websites,advertising,logos,photography',
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

        $project->update($validator->validated());

        return response()->json([
            'message' => 'Project updated successfully',
            'project' => new ProjectResource($project),
        ], 200);
    }

    /**
     * Remove the specified project (Admin endpoint).
     *
     * @param Project $project
     * @return JsonResponse
     */
    public function destroy(Project $project): JsonResponse
    {
        // Delete associated media files
        if ($project->image_path && Storage::disk('public')->exists($project->image_path)) {
            Storage::disk('public')->delete($project->image_path);
        }

        if ($project->video_path && Storage::disk('public')->exists($project->video_path)) {
            Storage::disk('public')->delete($project->video_path);
        }

        $project->delete();

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