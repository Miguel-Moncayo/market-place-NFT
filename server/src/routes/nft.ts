import express from 'express';
import { 
  getNFTs, 
  getNFTById, 
  createNFT, 
  buyNFT, 
  getUserNFTs, 
  updateNFT, 
  deleteNFT 
} from '../controllers/nftController';
import { auth } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = express.Router();

// Get all NFTs with filtering and pagination
router.get('/', getNFTs);

// Get single NFT by ID
router.get('/:id', getNFTById);

// Create new NFT (protected)
router.post('/', auth, upload.single('image'), createNFT);

// Buy NFT (protected)
router.post('/:id/buy', auth, buyNFT);

// Get user's NFTs (protected)
router.get('/user/:userId', getUserNFTs);

// Update NFT (protected)
router.put('/:id', auth, updateNFT);

// Delete NFT (protected)
router.delete('/:id', auth, deleteNFT);

export default router;