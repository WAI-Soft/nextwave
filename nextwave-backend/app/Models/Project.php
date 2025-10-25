<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'client',
        'service_category',
        'year',
        'image_path',
        'video_path',
        'is_published',
        'title_en',
        'title_ar',
        'description_en',
        'description_ar',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'is_published' => 'boolean',
        'year' => 'integer',
    ];

    /**
     * Get the title based on the specified language.
     *
     * @param string $lang
     * @return string
     */
    public function getTitle($lang = 'en')
    {
        return $lang === 'ar' ? $this->title_ar : $this->title_en;
    }

    /**
     * Get the description based on the specified language.
     *
     * @param string $lang
     * @return string
     */
    public function getDescription($lang = 'en')
    {
        return $lang === 'ar' ? $this->description_ar : $this->description_en;
    }

    /**
     * Scope a query to only include published projects.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    /**
     * Scope a query to filter by service category.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @param string $category
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeByCategory($query, $category)
    {
        return $query->where('service_category', $category);
    }
}