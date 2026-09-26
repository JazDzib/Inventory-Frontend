import ProductForm from "@/components/CreateProduct";
import Pagination from "@/components/Paginacion";
import ProductTable from "@/components/ProductTable";
import { getAllCategories } from "@/services/categoryService";
import { getAllProducts, removeProduct } from "@/services/productService";
import type { GetCategoryResponse } from "@/types/category/GetCategoryResponse";
import type { GetProductResponse } from "@/types/product/GetProductResponse";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";


export default function ProductPage (){
    const [products, setProducts] = useState<GetProductResponse[]>([]);
    const [categories, setCategories] = useState<GetCategoryResponse[]>([]);
    const [pages, setPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen ] = useState(false);
    const [edit, setEdit] = useState<GetProductResponse | null>(null);
    const [total, setTotal] = useState(0);
    const limit = 10;

    const loadProducts = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getAllProducts(pages, limit);
            setProducts(response.data);
            setTotal(response.totalProducts);
        } catch (error) {
            toast.error((error as Error).message);
        } finally {
            setIsLoading(false);
        }
    }, [pages]);


    useEffect(()=>{
        loadProducts();
    },[loadProducts]);

    useEffect(()=> {
        getAllCategories().then(setCategories)
    },[]);

    const openModal = () => {
        setEdit(null)
        setIsOpen(true);
    }

    const handleDelete = async (id: number) => {
         const ok = window.confirm("¿Seguro que deseas eliminar este producto?");
        if (!ok) return;
        try {
            await removeProduct(id);
            toast.success("Producto eliminado exitosamente");
            await loadProducts();
        } catch (error) {
            toast.error((error as Error).message);
        }
    }

    const handleEdit = (product: GetProductResponse) => {
        setEdit(product);   
        setIsOpen(true);
    };

     const handleSuccess = () => {
        setIsOpen(false);
        setEdit(null);
        loadProducts();
    };

    return(
        
    <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[#E9DDFF]">Productos</h2>
          <p className="mt-1 text-sm text-[#E9DDFF]/60">
            Inventario de productos con su categoría.
          </p>
        </div>
        <button
          onClick={openModal}
          className="w-full rounded-lg bg-[#E9DDFF] px-4 py-2 font-semibold text-[#111827] transition-colors hover:bg-[#E9DDFF]/90 sm:w-auto"
        >
          + Agregar producto
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-lg bg-[#1f2937]" />
          ))}
        </div>
      ) : (
        <>
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <Pagination page={pages} total={total} limit={limit} onPageChange={setPages} />
        </>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-lg rounded-lg border border-[#2d3748] bg-[#111827] p-6 max-h-[90vh] overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#E9DDFF]">
                {edit ? "Editar producto" : "Crear producto"}
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xl text-[#E9DDFF]/60 transition-colors hover:text-[#E9DDFF]"
              >
                ✕
              </button>
            </div>

            <ProductForm
              key={edit?.id ?? "nuevo"}
              categories={categories}
              edit={edit}
              onSuccess={handleSuccess}
            />
          </div>
        </div>
      )}
    </div>
        
    );
}