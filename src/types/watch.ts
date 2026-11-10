export interface Watch {
  id: string;
  reference: string;
  name: string;
  collection: string;
  price: number;
  image: string;
  heroImage?: string;
  badge?: string;
  description: string;
  highlights: string[];
  specs: {
    movement: string;
    caliber: string;
    powerReserve: string;
    caseMaterial: string;
    diameter: string;
    waterResistance: string;
    dial: string;
    bracelet: string;
    glass: string;
  };
  inStock: boolean;
  featured?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  watch: Watch;
  quantity: number;
  selectedBox?: 'standard' | 'luxury_wood' | 'collector_safe';
}

export type FilterCategory = 'all' | 'nautilus' | 'complications' | 'tourbillon' | 'heritage';
