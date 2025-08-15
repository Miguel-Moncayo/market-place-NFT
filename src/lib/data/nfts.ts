// Mock data for NFT gallery items
export interface NFTItem {
  id: number;
  title: string;
  artist: string;
  artistHandle: string;
  price: string;
  imageUrl: string;
  description: string;
  category: string;
  createdAt: string;
}

export const mockNFTs: NFTItem[] = [
  {
    id: 1,
    title: "Crypto Dreams #01",
    artist: "Samantha Williams",
    artistHandle: "@samanthaw",
    price: "1.25 ETH",
    imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Una pieza única que explora los límites entre la realidad y los sueños digitales.",
    category: "Digital Art",
    createdAt: "2024-01-15"
  },
  {
    id: 2,
    title: "Digital Horizon",
    artist: "Crypto Artist",
    artistHandle: "@cryptoart",
    price: "2.50 ETH",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Horizontes infinitos en un mundo digital sin fronteras.",
    category: "Abstract",
    createdAt: "2024-01-20"
  },
  {
    id: 3,
    title: "Neon Future",
    artist: "Digital Creator",
    artistHandle: "@digitalcreator",
    price: "0.75 ETH",
    imageUrl: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "El futuro brillante de la era digital representado en neón.",
    category: "Cyberpunk",
    createdAt: "2024-01-25"
  },
  {
    id: 4,
    title: "Abstract Mind",
    artist: "NFT Master",
    artistHandle: "@nftmaster",
    price: "3.20 ETH",
    imageUrl: "https://images.unsplash.com/photo-1635349493796-5c1f8f2b1994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Una exploración abstracta de la conciencia humana en la era digital.",
    category: "Abstract",
    createdAt: "2024-02-01"
  },
  {
    id: 5,
    title: "Cosmic Journey",
    artist: "Space Artist",
    artistHandle: "@spaceartist",
    price: "1.80 ETH",
    imageUrl: "https://images.unsplash.com/photo-1633412802994-5c058f151b66?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "Un viaje a través del cosmos digital y sus infinitas posibilidades.",
    category: "Space Art",
    createdAt: "2024-02-05"
  },
  {
    id: 6,
    title: "Virtual Reality",
    artist: "VR Expert",
    artistHandle: "@vrexpert",
    price: "0.95 ETH",
    imageUrl: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    description: "La línea entre lo real y lo virtual se desvanece en esta obra maestra.",
    category: "VR Art",
    createdAt: "2024-02-10"
  }
];