'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api';
import { NFT, NFTListResponse } from '@/types';

interface UseNFTsReturn {
  nfts: NFT[];
  loading: boolean;
  error: string | null;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  fetchNFTs: (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => Promise<void>;
}

export function useNFTs(): UseNFTsReturn {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 12,
    total: 0,
    pages: 0,
  });

  const fetchNFTs = async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sortBy?: string;
    sortOrder?: string;
  }) => {
    try {
      setLoading(true);
      setError(null);
      
      const response: NFTListResponse = await apiClient.getNFTs({
        page: params?.page || 1,
        limit: params?.limit || 12,
        ...params,
      });
      
      setNfts(response.nfts);
      setPagination(response.pagination);
    } catch (error) {
      console.error('Failed to fetch NFTs:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch NFTs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNFTs();
  }, []);

  return {
    nfts,
    loading,
    error,
    pagination,
    fetchNFTs,
  };
}