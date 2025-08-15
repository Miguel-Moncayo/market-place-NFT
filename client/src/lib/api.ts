const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
    
    // Load token from localStorage on client side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  setToken(token: string) {
    this.token = token;
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }

  clearToken() {
    this.token = null;
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    
    this.setToken(response.token);
    return response;
  }

  async register(username: string, email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
    
    this.setToken(response.token);
    return response;
  }

  async loginWithWallet(walletAddress: string, signature: string): Promise<AuthResponse> {
    const response = await this.request<AuthResponse>('/auth/wallet-login', {
      method: 'POST',
      body: JSON.stringify({ walletAddress, signature }),
    });
    
    this.setToken(response.token);
    return response;
  }

  // NFT endpoints
  async getNFTs(params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: string;
  }): Promise<NFTListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = `/nft${queryString ? `?${queryString}` : ''}`;
    
    return this.request<NFTListResponse>(endpoint);
  }

  async getNFTById(id: string): Promise<NFT> {
    return this.request<NFT>(`/nft/${id}`);
  }

  async createNFT(nftData: {
    name: string;
    description: string;
    price: number;
    currency: string;
    category: string;
    tags?: string;
    properties?: string;
  }, image: File): Promise<{ message: string; nft: NFT }> {
    const formData = new FormData();
    formData.append('image', image);
    
    Object.entries(nftData).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value.toString());
      }
    });

    const response = await fetch(`${this.baseURL}/nft`, {
      method: 'POST',
      headers: {
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  async buyNFT(id: string): Promise<{ message: string; nft: NFT; transaction: Transaction }> {
    return this.request<{ message: string; nft: NFT; transaction: Transaction }>(`/nft/${id}/buy`, {
      method: 'POST',
    });
  }

  async getUserNFTs(userId: string, type: 'created' | 'owned' = 'created'): Promise<NFT[]> {
    return this.request<NFT[]>(`/nft/user/${userId}?type=${type}`);
  }

  async updateNFT(id: string, nftData: {
    name?: string;
    description?: string;
    price?: number;
    currency?: string;
    category?: string;
    tags?: string;
    properties?: string;
    isListed?: boolean;
  }): Promise<{ message: string; nft: NFT }> {
    return this.request<{ message: string; nft: NFT }>(`/nft/${id}`, {
      method: 'PUT',
      body: JSON.stringify(nftData),
    });
  }

  async deleteNFT(id: string): Promise<{ message: string }> {
    return this.request<{ message: string }>(`/nft/${id}`, {
      method: 'DELETE',
    });
  }

  // User endpoints
  async getUserProfile(userId: string): Promise<UserProfile> {
    return this.request<UserProfile>(`/user/profile/${userId}`);
  }

  async updateUserProfile(profileData: {
    username?: string;
    bio?: string;
    avatar?: string;
  }): Promise<{ message: string; user: User }> {
    return this.request<{ message: string; user: User }>('/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  }

  async getUserTransactions(params?: {
    page?: number;
    limit?: number;
  }): Promise<TransactionListResponse> {
    const searchParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = searchParams.toString();
    const endpoint = `/user/transactions${queryString ? `?${queryString}` : ''}`;
    
    return this.request<TransactionListResponse>(endpoint);
  }
}

export const apiClient = new ApiClient(API_BASE_URL);