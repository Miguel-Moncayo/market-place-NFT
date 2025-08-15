// Mock data for tech stack
export interface TechItem {
  id: number;
  name: string;
  icon: string;
  description: string;
  category: string;
}

export const mockTechStack: TechItem[] = [
  {
    id: 1,
    name: "Ethereum",
    icon: "fab fa-ethereum",
    description: "Blockchain para contratos inteligentes",
    category: "Blockchain"
  },
  {
    id: 2,
    name: "React",
    icon: "fab fa-react",
    description: "Biblioteca JavaScript para interfaces",
    category: "Frontend"
  },
  {
    id: 3,
    name: "Node.js",
    icon: "fab fa-node-js",
    description: "Entorno de tiempo de ejecución JavaScript",
    category: "Backend"
  },
  {
    id: 4,
    name: "IPFS",
    icon: "fas fa-database",
    description: "Sistema de archivos distribuido",
    category: "Storage"
  },
  {
    id: 5,
    name: "Web3.js",
    icon: "fab fa-js",
    description: "Biblioteca para interactuar con Ethereum",
    category: "Blockchain"
  },
  {
    id: 6,
    name: "Blockchain",
    icon: "fas fa-shield-alt",
    description: "Tecnología de libro mayor distribuido",
    category: "Security"
  }
];