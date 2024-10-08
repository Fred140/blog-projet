export interface Projet {
  id?: string;
  createdAt: Date;
  titre: string;
  description: string;
  imageUrl: string;
  likes: number;
  visible: boolean;
}
