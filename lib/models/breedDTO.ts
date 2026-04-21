export interface Breed {
  id: number;
  name: string;
  description: string | null;
}

export interface BreedResponse {
  status: string;
  message: string;
  data: Breed[];
}