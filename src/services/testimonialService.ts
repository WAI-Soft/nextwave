import { apiClient } from '@/lib/api';

// Backend testimonial structure (what we get from API)
export interface BackendTestimonial {
  id: number;
  name_en: string;
  name_ar: string;
  position_en: string;
  position_ar: string;
  company_en: string;
  company_ar: string;
  content_en: string;
  content_ar: string;
  rating: number;
  image_url?: string;
  is_featured: boolean;
  is_published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

// Frontend testimonial structure (what we use in components)
export interface Testimonial {
  id: number;
  name: string;
  name_ar?: string;
  role: string;
  role_ar?: string;
  company: string;
  company_ar?: string;
  text: string;
  text_ar?: string;
  rating: number;
  image_url?: string;
  is_featured: boolean;
  is_published: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface TestimonialResponse {
  data: BackendTestimonial[];
}

export interface SingleTestimonialResponse {
  data: BackendTestimonial;
}

export interface CreateTestimonialData {
  name_en: string;
  name_ar?: string;
  position_en: string;
  position_ar?: string;
  company_en: string;
  company_ar?: string;
  content_en: string;
  content_ar?: string;
  rating?: number;
  image_url?: string;
  is_featured?: boolean;
  is_published?: boolean;
  order?: number;
}

export interface UpdateTestimonialData extends Partial<CreateTestimonialData> {}

// Helper function to map backend testimonial to frontend format
function mapBackendTestimonialToFrontend(backendTestimonial: BackendTestimonial): Testimonial {
  return {
    id: backendTestimonial.id,
    name: backendTestimonial.name_en,
    name_ar: backendTestimonial.name_ar,
    role: backendTestimonial.position_en,
    role_ar: backendTestimonial.position_ar,
    company: backendTestimonial.company_en,
    company_ar: backendTestimonial.company_ar,
    text: backendTestimonial.content_en,
    text_ar: backendTestimonial.content_ar,
    rating: backendTestimonial.rating,
    image_url: backendTestimonial.image_url,
    is_featured: backendTestimonial.is_featured,
    is_published: backendTestimonial.is_published,
    order: backendTestimonial.order,
    created_at: backendTestimonial.created_at,
    updated_at: backendTestimonial.updated_at,
  };
}

// Helper function to map frontend testimonial data to backend format
function mapFrontendTestimonialToBackend(frontendData: CreateTestimonialData | UpdateTestimonialData): any {
  return {
    name_en: frontendData.name_en,
    name_ar: frontendData.name_ar || '',
    position_en: frontendData.position_en,
    position_ar: frontendData.position_ar || '',
    company_en: frontendData.company_en,
    company_ar: frontendData.company_ar || '',
    content_en: frontendData.content_en,
    content_ar: frontendData.content_ar || '',
    rating: frontendData.rating || 5,
    image_url: frontendData.image_url || null,
    is_featured: frontendData.is_featured || false,
    is_published: frontendData.is_published !== undefined ? frontendData.is_published : true,
    order: frontendData.order || 0,
  };
}

class TestimonialService {
  // Get all testimonials (public)
  async getPublicTestimonials(): Promise<Testimonial[]> {
    try {
      const response = await apiClient.get<TestimonialResponse>('/testimonials');
      return response.data.map(mapBackendTestimonialToFrontend);
    } catch (error) {
      console.error('Failed to fetch public testimonials:', error);
      // Return fallback data if API fails
      return this.getFallbackTestimonials();
    }
  }

  // Get single testimonial by ID (public)
  async getTestimonial(id: number): Promise<Testimonial> {
    try {
      const response = await apiClient.get<SingleTestimonialResponse>(`/testimonials/${id}`);
      return mapBackendTestimonialToFrontend(response.data);
    } catch (error) {
      console.error('Failed to fetch testimonial:', error);
      throw error;
    }
  }

  // Get all testimonials including unpublished (admin only)
  async getAdminTestimonials(): Promise<Testimonial[]> {
    try {
      const response = await apiClient.get<TestimonialResponse>('/admin/testimonials');
      return response.data.map(mapBackendTestimonialToFrontend);
    } catch (error) {
      console.error('Failed to fetch admin testimonials:', error);
      throw error;
    }
  }

  // Create new testimonial (admin only)
  async createTestimonial(data: CreateTestimonialData): Promise<Testimonial> {
    try {
      const backendData = mapFrontendTestimonialToBackend(data);
      const response = await apiClient.post<{ data: BackendTestimonial }>('/testimonials', backendData);
      return mapBackendTestimonialToFrontend(response.data);
    } catch (error) {
      console.error('Failed to create testimonial:', error);
      throw error;
    }
  }

  // Update testimonial (admin only)
  async updateTestimonial(id: number, data: UpdateTestimonialData): Promise<Testimonial> {
    try {
      const backendData = mapFrontendTestimonialToBackend(data);
      const response = await apiClient.put<{ data: BackendTestimonial }>(`/testimonials/${id}`, backendData);
      return mapBackendTestimonialToFrontend(response.data);
    } catch (error) {
      console.error('Failed to update testimonial:', error);
      throw error;
    }
  }

  // Delete testimonial (admin only)
  async deleteTestimonial(id: number): Promise<void> {
    try {
      await apiClient.delete(`/testimonials/${id}`);
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
      throw error;
    }
  }

  // Fallback testimonials data (used when API is unavailable)
  private getFallbackTestimonials(): Testimonial[] {
    return [
      {
        id: 1,
        name: "Sarah Johnson",
        name_ar: "سارة جونسون",
        role: "Marketing Director",
        role_ar: "مديرة التسويق",
        company: "Tech Solutions Inc.",
        company_ar: "شركة الحلول التقنية",
        text: "NextWave delivered an exceptional website that exceeded our expectations. Their attention to detail and creative approach made all the difference.",
        text_ar: "قدمت نكست ويف موقعاً إلكترونياً استثنائياً فاق توقعاتنا. اهتمامهم بالتفاصيل ونهجهم الإبداعي أحدث فرقاً كبيراً.",
        rating: 5,
        is_featured: true,
        is_published: true,
        order: 1,
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-01-15T10:00:00Z",
      },
      {
        id: 2,
        name: "Ahmed Al-Rashid",
        name_ar: "أحمد الراشد",
        role: "CEO",
        role_ar: "الرئيس التنفيذي",
        company: "Digital Innovations",
        company_ar: "الابتكارات الرقمية",
        text: "Working with NextWave was a game-changer for our business. Their professional team delivered outstanding results on time and within budget.",
        text_ar: "العمل مع نكست ويف كان نقطة تحول لأعمالنا. فريقهم المحترف قدم نتائج متميزة في الوقت المحدد وضمن الميزانية.",
        rating: 5,
        is_featured: true,
        is_published: true,
        order: 2,
        created_at: "2024-01-10T14:30:00Z",
        updated_at: "2024-01-10T14:30:00Z",
      },
      {
        id: 3,
        name: "Maria Rodriguez",
        name_ar: "ماريا رودريغيز",
        role: "Brand Manager",
        role_ar: "مديرة العلامة التجارية",
        company: "Creative Studios",
        company_ar: "الاستوديوهات الإبداعية",
        text: "The branding work NextWave did for us was phenomenal. They truly understood our vision and brought it to life beautifully.",
        text_ar: "عمل العلامة التجارية الذي قامت به نكست ويف كان رائعاً. لقد فهموا رؤيتنا حقاً وأحيوها بشكل جميل.",
        rating: 5,
        is_featured: true,
        is_published: true,
        order: 3,
        created_at: "2024-01-05T09:15:00Z",
        updated_at: "2024-01-05T09:15:00Z",
      },
    ];
  }
}

export const testimonialService = new TestimonialService();
