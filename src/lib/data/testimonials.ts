// Mock data for testimonials
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatarUrl: string;
  rating: number;
}

export const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Samantha Williams",
    role: "Artista Digital",
    content: "NFTify ha transformado mi carrera como artista digital. He podido vender mis obras a coleccionistas de todo el mundo y recibir un reconocimiento que nunca imaginé.",
    avatarUrl: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 5
  },
  {
    id: 2,
    name: "Carlos Rodriguez",
    role: "Coleccionista NFT",
    content: "Como coleccionista, NFTify me ha permitido acceder a obras exclusivas de artistas emergentes. La plataforma es segura y el proceso de compra es muy sencillo.",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 5
  },
  {
    id: 3,
    name: "Maria Garcia",
    role: "Artista 3D",
    content: "La comunidad de NFTify es increíble. He conectado con otros artistas y hemos colaborado en proyectos que nunca hubieran sido posibles sin esta plataforma.",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
    rating: 5
  }
];