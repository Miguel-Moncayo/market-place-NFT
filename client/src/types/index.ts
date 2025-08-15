export interface User {
  id: string;
  username: string;
  email: string;
  walletAddress?: string;
  avatar?: string;
  bio?: string;
}

export interface NFT {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  currency: string;
  creator: User;
  owner: User;
  category: string;
  tags: string[];
  properties: Record<string, any>;
  isListed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Transaction {
  _id: string;
  nft: NFT;
  buyer: User;
  seller: User;
  price: number;
  currency: string;
  transactionHash?: string;
  status: 'pending' | 'completed' | 'failed';
  createdAt: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface PaginationData {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export interface NFTListResponse {
  nfts: NFT[];
  pagination: PaginationData;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  pagination: PaginationData;
}

export interface UserProfile {
  user: User;
  stats: {
    createdNFTs: number;
    ownedNFTs: number;
    transactions: number;
  };
}