'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { NFTGrid } from '@/components/NFTCard';
import { useNFTs } from '@/hooks/useNFTs';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { CreateNFTModal } from '@/components/CreateNFTModal';
import { Sparkles, TrendingUp, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { nfts, loading, fetchNFTs } = useNFTs();
  const { user } = useAuth();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const stats = [
    { icon: Sparkles, label: 'NFTs Created', value: '10K+' },
    { icon: Users, label: 'Active Users', value: '5K+' },
    { icon: TrendingUp, label: 'Total Volume', value: '$2.5M' },
  ];

  const categories = [
    { name: 'Art', color: 'from-purple-500 to-pink-500' },
    { name: 'Music', color: 'from-blue-500 to-cyan-500' },
    { name: 'Photography', color: 'from-green-500 to-teal-500' },
    { name: 'Sports', color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onCreateNFT={() => setShowCreateModal(true)} />
      
      <main>
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-600 via-pink-600 to-blue-600 text-white">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <motion.h1
                className="text-4xl md:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                Discover, Collect & Sell
                <br />
                <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                  Extraordinary NFTs
                </span>
              </motion.h1>
              
              <motion.p
                className="text-xl md:text-2xl mb-8 text-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                The world's first and largest NFT marketplace
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Link href="/nfts">
                  <Button variant="secondary" size="lg" className="group">
                    Explore NFTs
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                {user && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setShowCreateModal(true)}
                    className="bg-white/10 border-white/20 hover:bg-white/20"
                  >
                    Create NFT
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                    <stat.icon className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Browse by Category
              </h2>
              <p className="text-xl text-gray-600">
                Explore NFTs across different categories and collections
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category, index) => (
                <motion.div
                  key={category.name}
                  className="relative group cursor-pointer overflow-hidden rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90`}></div>
                  <div className="relative p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/80">Explore collection</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured NFTs Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Featured NFTs
                </h2>
                <p className="text-xl text-gray-600">
                  Discover the most popular NFTs on our platform
                </p>
              </div>
              <Link href="/nfts">
                <Button variant="outline">
                  View All
                </Button>
              </Link>
            </div>
            
            <NFTGrid nfts={nfts.slice(0, 8)} loading={loading} />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              Ready to Create Your First NFT?
            </motion.h2>
            <motion.p
              className="text-xl text-white/90 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Join thousands of creators and collectors on NebulaNFT
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {user ? (
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setShowCreateModal(true)}
                >
                  Create Your NFT Now
                </Button>
              ) : (
                <Link href="/nfts">
                  <Button variant="secondary" size="lg">
                    Explore NFTs
                  </Button>
                </Link>
              )}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />

      <CreateNFTModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={() => {
          fetchNFTs();
        }}
      />
    </div>
  );
}
