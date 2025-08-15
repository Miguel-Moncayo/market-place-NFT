'use client';

import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Loading } from '@/components/ui/Loading';
import { NFTGrid } from '@/components/NFTCard';
import { useAuth } from '@/hooks/useAuth';
import { apiClient } from '@/lib/api';
import { useState, useEffect } from 'react';
import { User, NFT, UserProfile } from '@/types';
import { Edit, Mail, Calendar, Copy, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ProfilePage() {
  const params = useParams();
  const profileId = params.id as string;
  const { user: currentUser } = useAuth();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [createdNFTs, setCreatedNFTs] = useState<NFT[]>([]);
  const [ownedNFTs, setOwnedNFTs] = useState<NFT[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'created' | 'owned'>('created');
  const [copied, setCopied] = useState(false);

  const isOwnProfile = currentUser && currentUser.id === profileId;

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);
        
        // Fetch profile
        const profileData = await apiClient.getUserProfile(profileId);
        setProfile(profileData);
        
        // Fetch created NFTs
        const created = await apiClient.getUserNFTs(profileId, 'created');
        setCreatedNFTs(created);
        
        // Fetch owned NFTs
        const owned = await apiClient.getUserNFTs(profileId, 'owned');
        setOwnedNFTs(owned);
        
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileId]);

  const handleCopyAddress = async () => {
    if (profile?.user.walletAddress) {
      await navigator.clipboard.writeText(profile.user.walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12">
          <Loading text="Loading profile..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600 mb-6">The user profile you're looking for doesn't exist.</p>
          <Link href="/nfts">
            <Button>Back to NFTs</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card>
              <CardBody className="p-8">
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
                  {/* Avatar */}
                  <div className="relative">
                    <Image
                      src={profile.user.avatar || '/default-avatar.png'}
                      alt={profile.user.username}
                      width={120}
                      height={120}
                      className="rounded-full border-4 border-white shadow-lg"
                    />
                    {isOwnProfile && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="absolute bottom-0 right-0 rounded-full p-2"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <h1 className="text-3xl font-bold text-gray-900 mb-2 md:mb-0">
                        {profile.user.username}
                      </h1>
                      {isOwnProfile && (
                        <Link href="/settings">
                          <Button variant="outline">Edit Profile</Button>
                        </Link>
                      )}
                    </div>

                    {profile.user.bio && (
                      <p className="text-gray-600 mb-4 max-w-2xl">{profile.user.bio}</p>
                    )}

                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Mail className="w-4 h-4" />
                        <span>{profile.user.email}</span>
                      </div>
                      
                      {profile.user.walletAddress && (
                        <div className="flex items-center space-x-2">
                          <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                            {profile.user.walletAddress.slice(0, 6)}...{profile.user.walletAddress.slice(-4)}
                          </span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCopyAddress}
                            className="p-1"
                          >
                            {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                          </Button>
                        </div>
                      )}
                      
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>Joined {new Date(profile.user.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{profile.stats.createdNFTs}</p>
                    <p className="text-gray-600">Created</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{profile.stats.ownedNFTs}</p>
                    <p className="text-gray-600">Owned</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{profile.stats.transactions}</p>
                    <p className="text-gray-600">Transactions</p>
                  </div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          {/* NFTs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {/* Tabs */}
            <div className="flex space-x-8 mb-6 border-b border-gray-200">
              <button
                onClick={() => setActiveTab('created')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'created'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Created NFTs ({createdNFTs.length})
              </button>
              <button
                onClick={() => setActiveTab('owned')}
                className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'owned'
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Owned NFTs ({ownedNFTs.length})
              </button>
            </div>

            {/* NFT Grid */}
            <div>
              {activeTab === 'created' ? (
                createdNFTs.length > 0 ? (
                  <NFTGrid nfts={createdNFTs} />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No NFTs Created Yet</h3>
                    <p className="text-gray-600 mb-4">
                      {isOwnProfile ? 'Create your first NFT to get started!' : 'This user hasn\'t created any NFTs yet.'}
                    </p>
                    {isOwnProfile && (
                      <Link href="/upload">
                        <Button>Create Your First NFT</Button>
                      </Link>
                    )}
                  </div>
                )
              ) : (
                ownedNFTs.length > 0 ? (
                  <NFTGrid nfts={ownedNFTs} />
                ) : (
                  <div className="text-center py-12">
                    <div className="text-gray-400 mb-4">
                      <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No NFTs Owned Yet</h3>
                    <p className="text-gray-600 mb-4">
                      {isOwnProfile ? 'Start collecting NFTs from our marketplace!' : 'This user doesn\'t own any NFTs yet.'}
                    </p>
                    {isOwnProfile && (
                      <Link href="/nfts">
                        <Button>Browse NFTs</Button>
                      </Link>
                    )}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}