<?php

namespace App\Http\Controllers;

use App\Models\Testimonial;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class TestimonialController extends Controller
{
    /**
     * Display a listing of published testimonials (Public endpoint).
     */
    public function index()
    {
        $testimonials = Testimonial::published()->ordered()->get();
        return response()->json(['data' => $testimonials]);
    }

    /**
     * Display the specified testimonial (Public endpoint).
     */
    public function show(Testimonial $testimonial): JsonResponse
    {
        if (!$testimonial->is_published) {
            abort(404);
        }

        return response()->json(['data' => $testimonial]);
    }

    /**
     * Get all testimonials including unpublished ones (Admin endpoint).
     */
    public function adminIndex()
    {
        $testimonials = Testimonial::ordered()->get();
        return response()->json(['data' => $testimonials]);
    }

    /**
     * Store a newly created testimonial (Admin endpoint).
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'role' => 'required|string|max:255',
            'role_ar' => 'nullable|string|max:255',
            'text' => 'required|string',
            'text_ar' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'is_published' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $testimonial = Testimonial::create($validator->validated());

        return response()->json([
            'message' => 'Testimonial created successfully',
            'data' => $testimonial,
        ], 201);
    }

    /**
     * Update the specified testimonial (Admin endpoint).
     */
    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'sometimes|required|string|max:255',
            'name_ar' => 'nullable|string|max:255',
            'role' => 'sometimes|required|string|max:255',
            'role_ar' => 'nullable|string|max:255',
            'text' => 'sometimes|required|string',
            'text_ar' => 'nullable|string',
            'rating' => 'nullable|integer|min:1|max:5',
            'is_published' => 'boolean',
            'order' => 'nullable|integer',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $testimonial->update($validator->validated());

        return response()->json([
            'message' => 'Testimonial updated successfully',
            'data' => $testimonial,
        ], 200);
    }

    /**
     * Remove the specified testimonial (Admin endpoint).
     */
    public function destroy(Testimonial $testimonial): JsonResponse
    {
        $testimonial->delete();

        return response()->json([
            'message' => 'Testimonial deleted successfully',
        ], 200);
    }
}
