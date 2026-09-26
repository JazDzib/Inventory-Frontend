export interface PaginatedResponse <T>{
    totalProducts: number;
    pages: number;
    currentPage: number;
    data: T[];
}