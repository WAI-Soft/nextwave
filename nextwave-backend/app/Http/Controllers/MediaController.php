<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class MediaController extends Controller
{
    /**
     * Handle file upload (Admin endpoint).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function upload(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'file' => 'required|file|max:51200', // 50MB max
            'type' => 'required|in:image,video',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $file = $request->file('file');
        $type = $request->input('type');

        // Additional validation based on file type
        if ($type === 'image') {
            $imageValidator = Validator::make($request->all(), [
                'file' => 'mimes:jpeg,jpg,png,gif,webp|max:10240', // 10MB for images
            ]);

            if ($imageValidator->fails()) {
                return response()->json([
                    'message' => 'Invalid image file',
                    'errors' => $imageValidator->errors(),
                ], 422);
            }
        } elseif ($type === 'video') {
            $videoValidator = Validator::make($request->all(), [
                'file' => 'mimes:mp4,avi,mov,wmv,flv,webm|max:51200', // 50MB for videos
            ]);

            if ($videoValidator->fails()) {
                return response()->json([
                    'message' => 'Invalid video file',
                    'errors' => $videoValidator->errors(),
                ], 422);
            }
        }

        try {
            // Generate unique filename
            $originalName = pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME);
            $extension = $file->getClientOriginalExtension();
            $filename = $originalName . '_' . time() . '.' . $extension;

            // Store file in the appropriate directory
            $directory = $type === 'image' ? 'projects/images' : 'projects/videos';
            $path = $file->storeAs($directory, $filename, 'public');

            return response()->json([
                'message' => 'File uploaded successfully',
                'path' => $path,
                'url' => url('storage/' . $path),
                'filename' => $filename,
                'size' => $file->getSize(),
                'type' => $type,
            ], 200);

        } catch (\Exception $e) {
            return response()->json([
                'message' => 'File upload failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Delete a file (Admin endpoint).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function delete(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'path' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $path = $request->input('path');

        try {
            if (Storage::disk('public')->exists($path)) {
                Storage::disk('public')->delete($path);
                
                return response()->json([
                    'message' => 'File deleted successfully',
                ], 200);
            } else {
                return response()->json([
                    'message' => 'File not found',
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'File deletion failed',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get file information (Admin endpoint).
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function info(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'path' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $path = $request->input('path');

        try {
            if (Storage::disk('public')->exists($path)) {
                $size = Storage::disk('public')->size($path);
                $lastModified = Storage::disk('public')->lastModified($path);
                
                return response()->json([
                    'path' => $path,
                    'url' => url('storage/' . $path),
                    'size' => $size,
                    'last_modified' => date('Y-m-d H:i:s', $lastModified),
                    'exists' => true,
                ], 200);
            } else {
                return response()->json([
                    'message' => 'File not found',
                    'exists' => false,
                ], 404);
            }
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to get file information',
                'error' => $e->getMessage(),
            ], 500);
        }
    }
}