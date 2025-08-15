'use client';

import { motion } from 'framer-motion';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { NFT } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface NFTCardProps {
  nft: NFT;
}

export function NFTCard({ nft }: NFTCardProps) {
  return (
    <Card hover className="group">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={nft.image}
          alt={nft.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300" />
        {nft.isListed && (
          <div className="absolute top-3 right-3">
            <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              For Sale
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900 truncate">{nft.name}</h3>
          <span className="text-sm text-gray-500">{nft.category}</span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{nft.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Image
              src={nft.creator.avatar || '/default-avatar.png'}
              alt={nft.creator.username}
              width={24}
              height={24}
              className="rounded-full"
            />
            <span className="text-sm text-gray-600">{nft.creator.username}</span>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Price</p>
            <p className="font-semibold text-purple-600">
              {nft.price} {nft.currency}
            </p>
          </div>
        </div>
        
        <Link href={`/nfts/${nft._id}`}>
          <Button variant="primary" size="sm" className="w-full">
            View Details
          </Button>
        </Link>
      </div>
    </Card>
  );
}

interface NFTGridProps {
  nfts: NFT[];
  loading?: boolean;
}

export function NFTGrid({ nfts, loading = false }: NFTGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="aspect-square bg-gray-200" />
            <div className="p-4 space-y-3">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-3 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No NFTs found</h3>
        <p className="text-gray-600">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {nfts.map((nft, index) => (
        <motion.div
          key={nft._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <NFTCard nft={nft} />
        </motion.div>
      ))}
    </motion.div>
  );
}