import { apiClient } from '@/lib/api';
import { Project } from '@/contexts/ProjectContext';

// Backend API response interfaces
export interface BackendProject {
  id: number;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  service_category: string;
  client: string;
  year: number;
  image_path: string | null;
  video_path: string | null;
  is_published: number;
  created_at: string;
  updated_at: string;
}

export interface ProjectResponse {
  data: BackendProject[];
  meta?: {
    total: number;
    page: number;
    per_page: number;
  };
}

export interface SingleProjectResponse {
  data: BackendProject;
}

export interface CreateProjectData {
  name: string;
  description: string;
  purpose: string;
  clientName: string;
  year: number;
  projectType: string;
  tags: string[];
  coverImage: string;
  status: 'draft' | 'published';
}

export interface UpdateProjectData extends Partial<CreateProjectData> {}

// Helper function to map backend project to frontend Project interface
function mapBackendProjectToFrontend(backendProject: BackendProject): Project {
  // Service category is already in the correct format (branding, websites, etc.)
  const projectType = backendProject.service_category;

  // Generate tags from service category
  const categoryTags: { [key: string]: string[] } = {
    'branding': ['Brand Identity', 'Brand Guidelines', 'Visual Identity'],
    'websites': ['Web Design', 'UX/UI', 'Responsive Design'],
    'advertising': ['Digital Ads', 'Social Media', 'Campaign'],
    'logos': ['Logo Design', 'Brand Mark', 'Identity'],
    'photography': ['Professional Photography', 'Visual Content', 'Image Production']
  };

  return {
    id: backendProject.id.toString(),
    name: backendProject.title_en,
    nameAr: backendProject.title_ar,
    description: backendProject.description_en,
    descriptionAr: backendProject.description_ar,
    purpose: backendProject.description_en,
    clientName: backendProject.client || 'Client',
    year: backendProject.year || new Date().getFullYear(),
    projectType: projectType,
    tags: categoryTags[projectType] || [projectType],
    coverImage: backendProject.image_path || '/src/assets/brand-identity.png',
    slug: backendProject.title_en.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-'),
    status: backendProject.is_published ? 'published' : 'draft',
    createdAt: backendProject.created_at,
    updatedAt: backendProject.updated_at
  };
}

class ProjectService {
  // Get all published projects (public)
  async getPublicProjects(): Promise<Project[]> {
    try {
      const response = await apiClient.get<ProjectResponse>('/projects');
      return response.data.map(mapBackendProjectToFrontend);
    } catch (error) {
      console.error('Failed to fetch public projects:', error);
      throw error;
    }
  }

  // Get single project by ID (public)
  async getProject(id: string): Promise<Project> {
    try {
      const response = await apiClient.get<SingleProjectResponse>(`/projects/${id}`);
      return mapBackendProjectToFrontend(response.data);
    } catch (error) {
      console.error('Failed to fetch project:', error);
      throw error;
    }
  }

  // Get all projects including drafts (admin only)
  async getAdminProjects(): Promise<Project[]> {
    try {
      const response = await apiClient.get<ProjectResponse>('/admin/projects');
      return response.data.map(mapBackendProjectToFrontend);
    } catch (error) {
      console.error('Failed to fetch admin projects:', error);
      throw error;
    }
  }

  // Create new project (admin only)
  async createProject(data: CreateProjectData): Promise<Project> {
    try {
      // Map frontend data to backend format
      const backendData = {
        title_en: data.name,
        title_ar: data.name, // For now, use same as English
        description_en: data.description,
        description_ar: data.description, // For now, use same as English
        service_category: data.projectType,
        client: data.clientName,
        year: data.year,
        image_path: data.coverImage,
        video_path: null,
        is_published: data.status === 'published'
      };

      console.log('Creating project with data:', backendData);
      const response = await apiClient.post<{ message: string; data: BackendProject }>('/admin/projects', backendData);
      console.log('Create project response:', response);
      
      // The response structure is { message: '...', data: BackendProject }
      const projectData = response.data || response;
      return mapBackendProjectToFrontend(projectData);
    } catch (error) {
      console.error('Failed to create project:', error);
      throw error;
    }
  }

  // Update project (admin only)
  async updateProject(id: string, data: UpdateProjectData): Promise<Project> {
    try {
      // Map frontend data to backend format
      const backendData: any = {};
      
      if (data.name) {
        backendData.title_en = data.name;
        backendData.title_ar = data.name;
      }
      if (data.description) {
        backendData.description_en = data.description;
        backendData.description_ar = data.description;
      }
      if (data.projectType) {
        backendData.service_category = data.projectType;
      }
      if (data.clientName) {
        backendData.client = data.clientName;
      }
      if (data.year) {
        backendData.year = data.year;
      }
      if (data.coverImage) {
        backendData.image_path = data.coverImage;
      }
      if (data.status) {
        backendData.is_published = data.status === 'published';
      }

      console.log('Updating project', id, 'with data:', backendData);
      const response = await apiClient.put<{ message: string; data: BackendProject }>(`/admin/projects/${id}`, backendData);
      console.log('Update project response:', response);
      
      // The response structure is { message: '...', data: BackendProject }
      const projectData = response.data || response;
      return mapBackendProjectToFrontend(projectData);
    } catch (error) {
      console.error('Failed to update project:', error);
      throw error;
    }
  }

  // Delete project (admin only)
  async deleteProject(id: string): Promise<void> {
    try {
      await apiClient.delete(`/admin/projects/${id}`);
    } catch (error) {
      console.error('Failed to delete project:', error);
      throw error;
    }
  }

  // Upload image
  async uploadImage(file: File): Promise<string> {
    try {
      const response = await apiClient.upload<{ data: { url: string } }>('/admin/upload', file);
      return response.data.url;
    } catch (error) {
      console.error('Failed to upload image:', error);
      throw error;
    }
  }
}

export const projectService = new ProjectService();
