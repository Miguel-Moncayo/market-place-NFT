'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { Wallet, User, LogOut, Menu, X } from 'lucide-react';
import Link from 'next/link';

interface HeaderProps {
  onCreateNFT?: () => void;
}

export function Header({ onCreateNFT }: HeaderProps) {
  const { user, logout } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  
  const [authForm, setAuthForm] = useState({
    email: '',
    password: '',
    username: '',
  });

  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isLogin) {
        await useAuth().login(authForm.email, authForm.password);
      } else {
        await useAuth().register(authForm.username, authForm.email, authForm.password);
      }
      setShowAuthModal(false);
      setAuthForm({ email: '', password: '', username: '' });
    } catch (error) {
      console.error('Authentication error:', error);
      alert('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleWalletConnect = async () => {
    // Simulate wallet connection
    try {
      const mockWalletAddress = '0x' + Math.random().toString(16).substr(2, 40);
      const mockSignature = '0x' + Math.random().toString(16).substr(2, 130);
      await useAuth().loginWithWallet(mockWalletAddress, mockSignature);
    } catch (error) {
      console.error('Wallet connection error:', error);
      alert('Wallet connection failed');
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                NebulaNFT
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link href="/nfts" className="text-gray-700 hover:text-purple-600 transition-colors">
                Explore
              </Link>
              {user && (
                <>
                  <Link href="/profile" className="text-gray-700 hover:text-purple-600 transition-colors">
                    Profile
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={onCreateNFT}
                  >
                    Create NFT
                  </Button>
                </>
              )}
            </nav>

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                    <span className="text-sm font-medium text-gray-700">{user.username}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="flex items-center space-x-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleWalletConnect}
                    className="flex items-center space-x-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Connect Wallet</span>
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
              >
                {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {showMobileMenu && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-2 space-y-2">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                onClick={() => setShowMobileMenu(false)}
              >
                Home
              </Link>
              <Link
                href="/nfts"
                className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                onClick={() => setShowMobileMenu(false)}
              >
                Explore
              </Link>
              {user && (
                <>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Profile
                  </Link>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      onCreateNFT?.();
                      setShowMobileMenu(false);
                    }}
                    className="w-full mt-2"
                  >
                    Create NFT
                  </Button>
                </>
              )}
              
              {user ? (
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-3 px-3 py-2">
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.username}
                        className="w-8 h-8 rounded-full"
                      />
                    ) : (
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    )}
                    <div>
                      <p className="text-sm font-medium text-gray-700">{user.username}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="w-full mt-2"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="pt-4 border-t border-gray-200 space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleWalletConnect}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    <Wallet className="w-4 h-4" />
                    <span>Connect Wallet</span>
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => {
                      setShowAuthModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full"
                  >
                    Sign In
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </header>

      {/* Auth Modal */}
      <Modal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)}>
        <form onSubmit={handleAuth}>
          <ModalHeader>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </ModalHeader>
          
          <ModalBody>
            <div className="space-y-4">
              {!isLogin && (
                <Input
                  label="Username"
                  value={authForm.username}
                  onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                  required
                />
              )}
              
              <Input
                label="Email"
                type="email"
                value={authForm.email}
                onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                required
              />
              
              <Input
                label="Password"
                type="password"
                value={authForm.password}
                onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                required
              />
              
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-purple-600 hover:text-purple-700"
                >
                  {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
                </button>
              </div>
            </div>
          </ModalBody>
          
          <ModalFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowAuthModal(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
            </Button>
          </ModalFooter>
        </form>
      </Modal>
    </>
  );
}