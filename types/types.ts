export type Category = 
  | 'Combos & Kits'
  | 'Cervejas' 
  | 'Vinhos' 
  | 'Destilados' 
  | 'Refrigerantes' 
  | 'Energéticos' 
  | 'Gelo';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description?: string;
  image: string;
  badge?: string;
}
