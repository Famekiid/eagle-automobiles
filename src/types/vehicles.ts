export interface Vehicle {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  mileage: number;
  transmission: string;
  fuelType: string;
  year: number;
  color: string;
}

export interface FilterOptions {
  brands: string[];
  priceRange: [number, number];
  fuelType: string[];
  transmission: string[];
}

export type SortOption = 'newest' | 'price-low' | 'price-high' | 'rating';
