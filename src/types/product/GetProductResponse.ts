export const SUPPLIER_VALUES = [
  "Electrónica",
  "Hogar",
  "Ferretería",
  "Ropa",
  "Alimentos",
  "Papelería",
] as const;

export type Supplier = (typeof SUPPLIER_VALUES)[number]; 
export interface GetProductResponse{
    id: number;
    name: string;
    quantity: number;
    price: number;
    supplier: Supplier; 
    categoryId: number;
    category?: {
        id: number;
        name: string;
    };
}