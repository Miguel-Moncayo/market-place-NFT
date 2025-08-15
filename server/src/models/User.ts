import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  walletAddress?: string;
  avatar?: string;
  bio?: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  walletAddress: {
    type: String,
    unique: true,
    sparse: true
  },
  avatar: {
    type: String
  },
  bio: {
    type: String,
    maxlength: 500
  }
}, {
  timestamps: true
});

// Create text index for search
userSchema.index({ username: 'text', email: 'text' });

export const User = mongoose.model<IUser>('User', userSchema);