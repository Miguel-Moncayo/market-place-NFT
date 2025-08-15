'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';
import { NFT } from '@/types';

interface UseNFTDetailReturn {
  nft: NFT | null;
  loading: boolean;
  error: string | null;
  buyNFT: () => Promise<void>;
  buying: boolean;
}

export function useNFTDetail(id: string): UseNFTDetailReturn {
  const [nft, setNft] = useState<NFT | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [buying, setBuying] = useState(false);

  const fetchNFT = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const nftData: NFT = await apiClient.getNFTById(id);
      setNft(nftData);
    } catch (error) {
      console.error('Failed to fetch NFT:', error);
      setError(error instanceof Error ? error.message : 'Failed to fetch NFT');
    } finally {
      setLoading(false);
    }
  };

  const buyNFT = async () => {
    try {
      setBuying(true);
      setError(null);
      
      await apiClient.buyNFT(id);
      
      // Refresh NFT data after purchase
      await fetchNFT();
    } catch (error) {
      console.error('Failed to buy NFT:', error);
      setError(error instanceof Error ? error.message : 'Failed to buy NFT');
    } finally {
      setBuying(false);
    }
  };

  // Fetch NFT on mount
  useState(() => {
    fetchNFT();
  });

  return {
    nft,
    loading,
    error,
    buyNFT,
    buying,
  };
}