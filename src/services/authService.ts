import { apiClient } from '@/lib/api';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
    };
    token: string;
  };
}

export interface UserResponse {
  data: {
    id: string;
    name: string;
    email: string;
  };
}

class AuthService {
  // Login
  async login(credentials: LoginCredentials): Promise<AuthResponse['data']> {
    try {
      const response = await apiClient.post<AuthResponse>('/admin/login', credentials);
      
      // Store token
      if (response.data.token) {
        apiClient.setToken(response.data.token);
      }
      
      return response.data;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  // Logout
  async logout(): Promise<void> {
    try {
      await apiClient.post('/admin/logout');
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      // Clear token regardless of API response
      apiClient.setToken(null);
    }
  }

  // Get current user
  async getCurrentUser(): Promise<UserResponse['data']> {
    try {
      const response = await apiClient.get<UserResponse>('/admin/me');
      return response.data;
    } catch (error) {
      console.error('Failed to get current user:', error);
      throw error;
    }
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return !!apiClient.getToken();
  }

  // Get stored token
  getToken(): string | null {
    return apiClient.getToken();
  }
}

export const authService = new AuthService();
