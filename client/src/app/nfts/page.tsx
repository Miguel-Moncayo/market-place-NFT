'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NFTGrid } from '@/components/NFTCard';
import { NFTFilters } from '@/components/NFTFilters';
import { useNFTs } from '@/hooks/useNFTs';
import { Button } from '@/components/ui/Button';
import { Loading } from '@/components/ui/Loading';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';

export default function NFTsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { nfts, loading, error, pagination, fetchNFTs } = useNFTs();
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
  });

  useEffect(() => {
    // Update URL when filters change
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });
    
    const newUrl = `/nfts${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newUrl, { scroll: false });
    
    // Fetch NFTs with new filters
    fetchNFTs(filters);
  }, [filters]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handlePageChange = (page: number) => {
    fetchNFTs({ ...filters, page });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Explore NFTs
            </h1>
            <p className="text-xl text-gray-600">
              Discover and collect extraordinary NFTs
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <NFTFilters
              onFiltersChange={handleFiltersChange}
              initialFilters={filters}
            />
          </motion.div>

          {/* Results Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6 flex justify-between items-center"
          >
            <p className="text-gray-600">
              {loading ? 'Loading...' : `Showing ${nfts.length} of ${pagination.total} NFTs`}
            </p>
            
            {error && (
              <p className="text-red-600">{error}</p>
            )}
          </motion.div>

          {/* NFT Grid */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="py-12"
            >
              <Loading text="Loading NFTs..." />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <NFTGrid nfts={nfts} loading={loading} />
            </motion.div>
          )}

          {/* Pagination */}
          {!loading && pagination.pages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-8 flex justify-center"
            >
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                >
                  Previous
                </Button>
                
                {Array.from({ length: Math.min(pagination.pages, 5) }, (_, i) => {
                  let pageNum;
                  if (pagination.pages <= 5) {
                    pageNum = i + 1;
                  } else if (pagination.page <= 3) {
                    pageNum = i + 1;
                  } else if (pagination.page >= pagination.pages - 2) {
                    pageNum = pagination.pages - 4 + i;
                  } else {
                    pageNum = pagination.page - 2 + i;
                  }
                  
                  return (
                    <Button
                      key={pageNum}
                      variant={pagination.page === pageNum ? 'primary' : 'outline'}
                      onClick={() => handlePageChange(pageNum)}
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                
                <Button
                  variant="outline"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.pages}
                >
                  Next
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}