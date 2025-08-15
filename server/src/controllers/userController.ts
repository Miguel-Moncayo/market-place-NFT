import { Request, Response } from 'express';
import { User } from '../models/User';
import { NFT } from '../models/NFT';
import { Transaction } from '../models/Transaction';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get user stats
    const createdNFTs = await NFT.countDocuments({ creator: userId });
    const ownedNFTs = await NFT.countDocuments({ owner: userId });
    const transactions = await Transaction.countDocuments({
      $or: [{ buyer: userId }, { seller: userId }]
    });

    res.json({
      user,
      stats: {
        createdNFTs,
        ownedNFTs,
        transactions
      }
    });
  } catch (error) {
    console.error('Get user profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // From auth middleware
    const { username, bio, avatar } = req.body;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update fields
    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        walletAddress: user.walletAddress,
        avatar: user.avatar,
        bio: user.bio
      }
    });
  } catch (error) {
    console.error('Update user profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserTransactions = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId; // From auth middleware
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const transactions = await Transaction.find({
      $or: [{ buyer: userId }, { seller: userId }]
    })
    .populate('nft', 'name image')
    .populate('buyer', 'username avatar')
    .populate('seller', 'username avatar')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

    const total = await Transaction.countDocuments({
      $or: [{ buyer: userId }, { seller: userId }]
    });

    res.json({
      transactions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get user transactions error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};