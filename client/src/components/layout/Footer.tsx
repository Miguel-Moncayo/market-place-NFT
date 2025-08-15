'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"
              />
              <span className="text-xl font-bold">NebulaNFT</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Discover, collect, and sell extraordinary NFTs on the world's first & largest NFT marketplace.
            </p>
            <div className="flex space-x-4">
              {['Twitter', 'Discord', 'Instagram', 'Telegram'].map((social) => (
                <motion.a
                  key={social}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-6 h-6 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-xs">{social.charAt(0)}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Marketplace
            </h3>
            <ul className="space-y-2">
              {['All NFTs', 'Art', 'Music', 'Photography', 'Sports', 'Trading Cards'].map((item) => (
                <li key={item}>
                  <Link
                    href={`/nfts?category=${item.toLowerCase().replace(' ', '-')}`}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {['Help Center', 'Platform Status', 'Partners', 'Blog', 'Newsletter', 'Community'].map((item) => (
                <li key={item}>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 NebulaNFT. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
                <Link
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors text-sm"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}