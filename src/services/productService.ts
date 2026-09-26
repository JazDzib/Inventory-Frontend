import type { PaginatedResponse } from "@/types/product/PaginatedResponse";
import type { CreateProductRequest } from "@/types/product/CreateProductRequest";
import type { GetProductResponse } from "@/types/product/GetProductResponse";
import type { UpdateProductRequest } from "@/types/product/UpdateProductRequest";
import api from "@/utils/axios";

const getAllProducts = async (page: number, limit: number): Promise <PaginatedResponse<GetProductResponse>> => {
    const response = await api.get<PaginatedResponse<GetProductResponse>>('/products/', {params:{page, limit}});
    return response.data;
}


const createProduct = async (data: CreateProductRequest): Promise <GetProductResponse> => {
    const response = await  api.post<GetProductResponse>('/products/', data);
    return response.data;
}

const updateProduct = async (id:number, data: UpdateProductRequest): Promise <GetProductResponse> => {
    const response = await api.put<GetProductResponse>(`/products/${id}`, data);
    return response.data;
}

const removeProduct = async (id:number): Promise<void> => {
    await api.delete(`/products/${id}`);
    
}

export {getAllProducts, createProduct, updateProduct, removeProduct}