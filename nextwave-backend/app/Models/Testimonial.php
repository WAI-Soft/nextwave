<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Testimonial extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'name_ar',
        'role',
        'role_ar',
        'text',
        'text_ar',
        'rating',
        'is_published',
        'order',
    ];

    protected $casts = [
        'is_published' => 'boolean',
        'rating' => 'integer',
        'order' => 'integer',
    ];

    /**
     * Scope to get only published testimonials
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope to order testimonials
     */
    public function scopeOrdered($query)
    {
        return $query->orderBy('order', 'asc')->orderBy('created_at', 'desc');
    }
}
