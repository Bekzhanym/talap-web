const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

class ApiService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      ...options,
      headers: {
        ...this.getAuthHeaders(),
        ...options.headers,
      },
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid, redirect to auth
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          throw new Error('Unauthorized');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Get user info
  async getUserInfo() {
    return this.makeRequest<{ email: string; uid: string }>('/me');
  }

  // Save progress
  async saveProgress(data: any) {
    return this.makeRequest('/save-progress', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  // Generate test
  async generateTest(params: any) {
    return this.makeRequest('/generate-test', {
      method: 'POST',
      body: JSON.stringify(params),
    });
  }
}

export const apiService = new ApiService(); 