
import type { GetCategoryResponse } from "@/types/category/GetCategoryResponse";
import api from "@/utils/axios";

const getAllCategories = async(): Promise <GetCategoryResponse[]> => {
    const response = await api.get<GetCategoryResponse[]>('/categories/');
    return response.data;
}


export { getAllCategories}