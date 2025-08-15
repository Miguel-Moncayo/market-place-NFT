import mongoose, { Document, Schema } from 'mongoose';

export interface INFT extends Document {
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  creator: mongoose.Types.ObjectId;
  owner: mongoose.Types.ObjectId;
  category: string;
  tags: string[];
  properties: Record<string, any>;
  isListed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const nftSchema = new Schema<INFT>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    maxlength: 1000
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    required: true,
    default: 'ETH',
    enum: ['ETH', 'BTC', 'USDT', 'USDC']
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Art', 'Music', 'Photography', 'Sports', 'Trading Cards', 'Collectibles', 'Utility', 'Gaming', 'Other']
  },
  tags: [{
    type: String,
    trim: true
  }],
  properties: {
    type: Schema.Types.Mixed,
    default: {}
  },
  isListed: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Create text index for search
nftSchema.index({ name: 'text', description: 'text', tags: 'text' });
// Create index for category
nftSchema.index({ category: 1 });
// Create index for price
nftSchema.index({ price: 1 });
// Create index for creator and owner
nftSchema.index({ creator: 1, owner: 1 });

export const NFT = mongoose.model<INFT>('NFT', nftSchema);