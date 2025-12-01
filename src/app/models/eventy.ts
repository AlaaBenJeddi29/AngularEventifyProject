// src/app/models/eventy.ts

export interface Eventy {
  id: string;              // ← STRING now!
  title: string;
  description: string;
  date: string | Date;
  location: string;
  price: number;
  nbPlaces: number;
  imageUrl: string;
  nbrLike: number;
}

// Remove the old class version completely or comment it out
// export class Eventy { ... }  ← DELETE THIS