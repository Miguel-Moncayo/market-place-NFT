import { Request, Response } from 'express';
import { NFT } from '../models/NFT';
import { User } from '../models/User';
import { Transaction } from '../models/Transaction';

export const getNFTs = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 12;
    const skip = (page - 1) * limit;
    
    const search = req.query.search as string || '';
    const category = req.query.category as string || '';
    const minPrice = parseFloat(req.query.minPrice as string) || 0;
    const maxPrice = parseFloat(req.query.maxPrice as string) || Number.MAX_SAFE_INTEGER;
    const sortBy = req.query.sortBy as string || 'createdAt';
    const sortOrder = req.query.sortOrder as string === 'asc' ? 1 : -1;

    // Build query
    let query: any = { isListed: true };
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category) {
      query.category = category;
    }
    
    query.price = { $gte: minPrice, $lte: maxPrice };

    // Get NFTs with pagination
    const nfts = await NFT.find(query)
      .populate('creator', 'username avatar')
      .populate('owner', 'username avatar')
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await NFT.countDocuments(query);

    res.json({
      nfts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Get NFTs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getNFTById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const nft = await NFT.findById(id)
      .populate('creator', 'username avatar bio')
      .populate('owner', 'username avatar bio');
    
    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }

    res.json(nft);
  } catch (error) {
    console.error('Get NFT by ID error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createNFT = async (req: Request, res: Response) => {
  try {
    const { name, description, price, currency, category, tags, properties } = req.body;
    const userId = (req as any).userId; // From auth middleware
    
    if (!req.file) {
      return res.status(400).json({ error: 'Image is required' });
    }

    const nft = new NFT({
      name,
      description,
      image: `/uploads/${req.file.filename}`,
      price,
      currency,
      creator: userId,
      owner: userId,
      category,
      tags: tags ? tags.split(',').map((tag: string) => tag.trim()) : [],
      properties: properties ? JSON.parse(properties) : {}
    });

    await nft.save();

    // Populate creator and owner details
    await nft.populate('creator', 'username avatar');
    await nft.populate('owner', 'username avatar');

    res.status(201).json({
      message: 'NFT created successfully',
      nft
    });
  } catch (error) {
    console.error('Create NFT error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const buyNFT = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId; // From auth middleware
    
    const nft = await NFT.findById(id);
    
    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }

    if (!nft.isListed) {
      return res.status(400).json({ error: 'NFT is not for sale' });
    }

    if (nft.owner.toString() === userId) {
      return res.status(400).json({ error: 'You already own this NFT' });
    }

    // Create transaction
    const transaction = new Transaction({
      nft: nft._id,
      buyer: userId,
      seller: nft.owner,
      price: nft.price,
      currency: nft.currency,
      status: 'completed'
    });

    await transaction.save();

    // Update NFT owner
    nft.owner = userId;
    nft.isListed = false; // Optionally delist after purchase
    await nft.save();

    // Populate details
    await nft.populate('creator', 'username avatar');
    await nft.populate('owner', 'username avatar');

    res.json({
      message: 'NFT purchased successfully',
      nft,
      transaction
    });
  } catch (error) {
    console.error('Buy NFT error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserNFTs = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const type = req.query.type as string || 'created'; // 'created' or 'owned'
    
    let query: any = {};
    
    if (type === 'created') {
      query.creator = userId;
    } else {
      query.owner = userId;
    }

    const nfts = await NFT.find(query)
      .populate('creator', 'username avatar')
      .populate('owner', 'username avatar')
      .sort({ createdAt: -1 });

    res.json(nfts);
  } catch (error) {
    console.error('Get user NFTs error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateNFT = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId; // From auth middleware
    const { name, description, price, currency, category, tags, properties, isListed } = req.body;
    
    const nft = await NFT.findById(id);
    
    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }

    if (nft.creator.toString() !== userId) {
      return res.status(403).json({ error: 'Not authorized to update this NFT' });
    }

    // Update fields
    if (name) nft.name = name;
    if (description) nft.description = description;
    if (price !== undefined) nft.price = price;
    if (currency) nft.currency = currency;
    if (category) nft.category = category;
    if (tags) nft.tags = tags.split(',').map((tag: string) => tag.trim());
    if (properties) nft.properties = JSON.parse(properties);
    if (isListed !== undefined) nft.isListed = isListed;

    await nft.save();

    // Populate details
    await nft.populate('creator', 'username avatar');
    await nft.populate('owner', 'username avatar');

    res.json({
      message: 'NFT updated successfully',
      nft
    });
  } catch (error) {
    console.error('Update NFT error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const deleteNFT = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = (req as any).userId; // From auth middleware
    
    const nft = await NFT.findById(id);
    
    if (!nft) {
      return res.status(404).json({ error: 'NFT not found' });
    }

    if (nft.creator.toString() !== userId) {
      return res.status(403).json({ error: 'Not authorized to delete this NFT' });
    }

    await NFT.findByIdAndDelete(id);

    res.json({ message: 'NFT deleted successfully' });
  } catch (error) {
    console.error('Delete NFT error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};