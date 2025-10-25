import { apiClient } from '@/lib/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export interface ContactResponse {
  message: string;
  data?: {
    id: string;
    created_at: string;
  };
}

class ContactService {
  // Submit contact form
  async submitContactForm(data: ContactFormData): Promise<ContactResponse> {
    try {
      const response = await apiClient.post<ContactResponse>('/contact', data);
      return response;
    } catch (error) {
      console.error('Failed to submit contact form:', error);
      throw error;
    }
  }
}

export const contactService = new ContactService();
