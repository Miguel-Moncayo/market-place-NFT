import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  nft: mongoose.Types.ObjectId;
  buyer: mongoose.Types.ObjectId;
  seller: mongoose.Types.ObjectId;
  price: number;
  currency: string;
  transactionHash?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
}

const transactionSchema = new Schema<ITransaction>({
  nft: {
    type: Schema.Types.ObjectId,
    ref: 'NFT',
    required: true
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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
    enum: ['ETH', 'BTC', 'USDT', 'USDC']
  },
  transactionHash: {
    type: String,
    unique: true,
    sparse: true
  },
  status: {
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
});

// Create index for buyer and seller
transactionSchema.index({ buyer: 1, seller: 1 });
// Create index for status
transactionSchema.index({ status: 1 });
// Create index for transaction date
transactionSchema.index({ createdAt: -1 });

export const Transaction = mongoose.model<ITransaction>('Transaction', transactionSchema);