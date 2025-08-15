'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { useState } from 'react';
import { Image, Upload, X } from 'lucide-react';

interface CreateNFTModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateNFTModal({ isOpen, onClose, onSuccess }: CreateNFTModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    currency: 'ETH',
    category: '',
    tags: '',
    properties: '{}',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: 'Art', label: 'Art' },
    { value: 'Music', label: 'Music' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Trading Cards', label: 'Trading Cards' },
    { value: 'Collectibles', label: 'Collectibles' },
    { value: 'Utility', label: 'Utility' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Other', label: 'Other' },
  ];

  const currencies = [
    { value: 'ETH', label: 'ETH' },
    { value: 'BTC', label: 'BTC' },
    { value: 'USDT', label: 'USDT' },
    { value: 'USDC', label: 'USDC' },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageFile) {
      alert('Please select an image');
      return;
    }

    try {
      setLoading(true);
      
      const response = await fetch('/api/nft/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: new FormData(),
      });

      const formDataToSend = new FormData();
      formDataToSend.append('image', imageFile);
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const createResponse = await fetch('/api/nft/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      if (!createResponse.ok) {
        throw new Error('Failed to create NFT');
      }

      // Reset form
      setFormData({
        name: '',
        description: '',
        price: '',
        currency: 'ETH',
        category: '',
        tags: '',
        properties: '{}',
      });
      setImageFile(null);
      setImagePreview('');
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error creating NFT:', error);
      alert('Failed to create NFT');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <form onSubmit={handleSubmit}>
        <ModalHeader onClose={onClose}>
          Create New NFT
        </ModalHeader>
        
        <ModalBody>
          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NFT Image
              </label>
              <div className="flex items-center justify-center w-full">
                {imagePreview ? (
                  <div className="relative">
                    <img
                      src={imagePreview}
                      alt="NFT preview"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview('');
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <Upload className="w-8 h-8 mb-4 text-gray-500" />
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span> or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="NFT Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />

              <div className="space-y-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price
                </label>
                <div className="flex space-x-2">
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                    className="flex-1"
                  />
                  <Select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    options={currencies}
                    className="w-24"
                  />
                </div>
              </div>
            </div>

            <Textarea
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />

            <Select
              label="Category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              options={categories}
              required
            />

            <Input
              label="Tags (comma-separated)"
              placeholder="art, digital, collectible"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            />

            <Textarea
              label="Properties (JSON format)"
              value={formData.properties}
              onChange={(e) => setFormData({ ...formData, properties: e.target.value })}
              helperText="Optional: Add custom properties in JSON format"
            />
          </div>
        </ModalBody>
        
        <ModalFooter>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create NFT'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}