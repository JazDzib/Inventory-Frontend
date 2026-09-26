export interface CreateProductRequest{
    name: string;
    quantity: number;
    price: number;
    supplier?: string;
    categoryId: number;
}