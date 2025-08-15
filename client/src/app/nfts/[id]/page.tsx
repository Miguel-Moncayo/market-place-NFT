'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { useNFTDetail } from '@/hooks/useNFTDetail';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { Share2, Heart, Clock, Tag, User, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NFTDetailPage() {
  const params = useParams();
  const nftId = params.id as string;
  
  const { nft, loading, error, buyNFT, buying } = useNFTDetail(nftId);
  const { user } = useAuth();
  const [showShareModal, setShowShareModal] = useState(false);

  const handleBuyNFT = async () => {
    try {
      await buyNFT();
      alert('NFT purchased successfully!');
    } catch (error) {
      alert('Failed to purchase NFT');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: nft?.name,
        text: nft?.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12">
          <Loading text="Loading NFT details..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !nft) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">NFT Not Found</h2>
          <p className="text-gray-600 mb-6">The NFT you're looking for doesn't exist.</p>
          <Link href="/nfts">
            <Button>Back to NFTs</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const isOwner = user && user.id === nft.owner._id;
  const isCreator = user && user.id === nft.creator._id;
  const canBuy = user && !isOwner && nft.isListed;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* NFT Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardBody className="p-0">
                  <div className="relative aspect-square">
                    <Image
                      src={nft.image}
                      alt={nft.name}
                      fill
                      className="object-cover rounded-t-xl"
                    />
                    {nft.isListed && (
                      <div className="absolute top-4 right-4">
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          For Sale
                        </span>
                      </div>
                    )}
                  </div>
                </CardBody>
              </Card>
            </motion.div>

            {/* NFT Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    {nft.name}
                  </h1>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleShare}
                    >
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Tag className="w-4 h-4" />
                    <span>{nft.category}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>Created {new Date(nft.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Creator */}
              <Card>
                <CardBody className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Image
                        src={nft.creator.avatar || '/default-avatar.png'}
                        alt={nft.creator.username}
                        width={40}
                        height={40}
                        className="rounded-full"
                      />
                      <div>
                        <p className="text-sm text-gray-600">Creator</p>
                        <Link href={`/profile/${nft.creator._id}`}>
                          <p className="font-medium text-gray-900 hover:text-purple-600">
                            {nft.creator.username}
                          </p>
                        </Link>
                      </div>
                    </div>
                    {isCreator && (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    )}
                  </div>
                </CardBody>
              </Card>

              {/* Owner */}
              {nft.owner._id !== nft.creator._id && (
                <Card>
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Image
                          src={nft.owner.avatar || '/default-avatar.png'}
                          alt={nft.owner.username}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                        <div>
                          <p className="text-sm text-gray-600">Owner</p>
                          <Link href={`/profile/${nft.owner._id}`}>
                            <p className="font-medium text-gray-900 hover:text-purple-600">
                              {nft.owner.username}
                            </p>
                          </Link>
                        </div>
                      </div>
                      {isOwner && (
                        <CheckCircle className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Description */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">{nft.description}</p>
              </div>

              {/* Price */}
              {nft.isListed && (
                <Card>
                  <CardBody className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Current Price</p>
                        <p className="text-2xl font-bold text-purple-600">
                          {nft.price} {nft.currency}
                        </p>
                      </div>
                      {canBuy && (
                        <Button
                          variant="primary"
                          size="lg"
                          onClick={handleBuyNFT}
                          disabled={buying}
                        >
                          {buying ? 'Buying...' : 'Buy Now'}
                        </Button>
                      )}
                    </div>
                  </CardBody>
                </Card>
              )}

              {/* Tags */}
              {nft.tags.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {nft.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Properties */}
              {Object.keys(nft.properties).length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Properties</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(nft.properties).map(([key, value]) => (
                      <Card key={key}>
                        <CardBody className="p-3">
                          <p className="text-sm text-gray-600 capitalize">{key}</p>
                          <p className="font-medium text-gray-900">{String(value)}</p>
                        </CardBody>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Status Messages */}
              {isOwner && (
                <Card>
                  <CardBody className="p-4">
                    <div className="flex items-center space-x-2 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">You own this NFT</span>
                    </div>
                  </CardBody>
                </Card>
              )}

              {!nft.isListed && !isOwner && (
                <Card>
                  <CardBody className="p-4">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span className="font-medium">This NFT is not for sale</span>
                    </div>
                  </CardBody>
                </Card>
              )}
            </motion.div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}