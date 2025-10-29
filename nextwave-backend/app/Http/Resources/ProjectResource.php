<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $lang = $request->query('lang', 'en');
        
        return [
            'id' => $this->id,
            'client' => $this->client,
            'service_category' => $this->service_category,
            'year' => $this->year,
            'image_path' => $this->image_path,
            'video_path' => $this->video_path,
            'is_published' => $this->is_published,
            'title' => $this->getTitle($lang),
            'description' => $this->getDescription($lang),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            // Always include all language versions
            'title_en' => $this->title_en,
            'title_ar' => $this->title_ar,
            'description_en' => $this->description_en,
            'description_ar' => $this->description_ar,
        ];
    }
}