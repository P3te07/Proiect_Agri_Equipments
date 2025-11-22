export interface Equipment {
  id?: string;
  name: string;
  description: string;
  pricePerDay: number;
  available: boolean;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}