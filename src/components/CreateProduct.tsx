import type { GetCategoryResponse } from "@/types/category/GetCategoryResponse";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { GetProductResponse } from "@/types/product/GetProductResponse";
import { createProduct, updateProduct } from "@/services/productService";
import { toast } from "sonner";

const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido").max(100, "El maximo son 100 caracteres"),
  quantity: z.number().min(0, "La cantidad no puede ser negativa"),
  price: z.number().min(0, "El precio no puede ser negativo"),
  categoryId: z.number().min(1, "Selecciona una categoria"),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  categories: GetCategoryResponse[];
  edit?: GetProductResponse | null;
  onSuccess: () => void;
}

export default function ProductForm({ categories, edit, onSuccess }: ProductFormProps) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: edit
      ? {
          name: edit.name,
          quantity: edit.quantity,
          price: Number(edit.price),
          categoryId: edit.categoryId,
        }
      : { name: "", quantity: 0, price: 0, categoryId: 0 },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      if (edit) {
        await updateProduct(edit.id, data);
        toast.success("Producto actualizado correctamente");
      } else {
        await createProduct(data);
        toast.success("Producto creado");
      }
      onSuccess();
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium text-[#E9DDFF]">
          Nombre del Producto
        </label>
        <input
          type="text"
          {...form.register("name")}
          className="w-full rounded-md border border-[#E9DDFF]/30 bg-[#111827] px-3 py-2 text-[#E9DDFF] placeholder-[#E9DDFF]/50 focus:border-[#E9DDFF] focus:outline-none focus:ring-1 focus:ring-[#E9DDFF]"
          placeholder="Ej. Laptop HP"
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-xs text-red-400">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium text-[#E9DDFF]">
            Cantidad
          </label>
          <input
            type="number"
            {...form.register("quantity", { valueAsNumber: true })}
            className="w-full rounded-md border border-[#E9DDFF]/30 bg-[#111827] px-3 py-2 text-[#E9DDFF] focus:border-[#E9DDFF] focus:outline-none focus:ring-1 focus:ring-[#E9DDFF]"
          />
          {form.formState.errors.quantity && (
            <p className="mt-1 text-xs text-red-400">{form.formState.errors.quantity.message}</p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-[#E9DDFF]">
            Precio ($)
          </label>
          <input
            type="number"
            step="0.01"
            {...form.register("price", { valueAsNumber: true })}
            className="w-full rounded-md border border-[#E9DDFF]/30 bg-[#111827] px-3 py-2 text-[#E9DDFF] focus:border-[#E9DDFF] focus:outline-none focus:ring-1 focus:ring-[#E9DDFF]"
          />
          {form.formState.errors.price && (
            <p className="mt-1 text-xs text-red-400">{form.formState.errors.price.message}</p>
          )}
        </div>
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium text-[#E9DDFF]">
          Categoría
        </label>
        <select
          {...form.register("categoryId", { valueAsNumber: true })}
          className="w-full rounded-md border border-[#E9DDFF]/30 bg-[#111827] px-3 py-2 text-[#E9DDFF] focus:border-[#E9DDFF] focus:outline-none focus:ring-1 focus:ring-[#E9DDFF]"
        >
          <option value={0}>Selecciona una...</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        {form.formState.errors.categoryId && (
          <p className="mt-1 text-xs text-red-400">{form.formState.errors.categoryId.message}</p>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-3 border-t border-[#E9DDFF]/20 pt-4">
        <button
          type="submit"
          disabled={form.formState.isSubmitting}
          className="rounded-md bg-[#E9DDFF] px-6 py-2 font-semibold text-[#111827] transition-all hover:bg-[#E9DDFF]/80 disabled:opacity-50"
        >
          {form.formState.isSubmitting
            ? "Guardando..."
            : edit
              ? "Actualizar Producto"
              : "Guardar Producto"}
        </button>
      </div>
    </form>
  );
}