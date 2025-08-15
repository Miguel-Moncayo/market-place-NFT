'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { Card, CardBody } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Input';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { Image, Upload, X, CheckCircle } from 'lucide-react';

export default function UploadPage() {
  const { user } = useAuth();
  const router = useRouter();
  
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
  const [success, setSuccess] = useState(false);

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

    if (!user) {
      alert('Please login to create an NFT');
      router.push('/');
      return;
    }

    try {
      setLoading(true);
      
      const formDataToSend = new FormData();
      formDataToSend.append('image', imageFile);
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch('/api/nft/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Failed to create NFT');
      }

      setSuccess(true);
      
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
      
      // Redirect after success
      setTimeout(() => {
        router.push('/profile/' + user.id);
      }, 2000);
      
    } catch (error) {
      console.error('Error creating NFT:', error);
      alert('Failed to create NFT');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Authentication Required</h2>
          <p className="text-gray-600 mb-6">Please login to create an NFT.</p>
          <Button onClick={() => router.push('/')}>Go to Home</Button>
        </div>
        <Footer />
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="py-12">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardBody className="p-8 text-center">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">NFT Created Successfully!</h2>
                <p className="text-gray-600 mb-6">Your NFT has been created and is now live on the marketplace.</p>
                <p className="text-sm text-gray-500">Redirecting to your profile...</p>
              </CardBody>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Create New NFT
              </h1>
              <p className="text-xl text-gray-600">
                Upload your digital asset and create your unique NFT
              </p>
            </div>

            <Card>
              <CardBody className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      NFT Image *
                    </label>
                    <div className="flex items-center justify-center w-full">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="NFT preview"
                            className="w-full h-96 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImageFile(null);
                              setImagePreview('');
                            }}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 hover:bg-red-600"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-12 h-12 mb-4 text-gray-500" />
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
                            required
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Basic Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="NFT Name *"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />

                    <div className="space-y-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Price *
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
                    label="Description *"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />

                  <Select
                    label="Category *"
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

                  <div className="flex justify-end space-x-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Creating NFT...' : 'Create NFT'}
                    </Button>
                  </div>
                </form>
              </CardBody>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}