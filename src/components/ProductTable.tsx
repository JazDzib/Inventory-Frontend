import type { GetProductResponse } from "@/types/product/GetProductResponse";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  products: GetProductResponse[];
  onEdit?: (product: GetProductResponse) => void;
  onDelete?: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: Props) {
  return (
     <div className="my-4 overflow-hidden rounded-lg border border-[#2d3748] bg-[#111827]">
      <div className="overflow-x-auto">
        <table className="min-w-[600px] table-auto text-left text-sm text-[#E9DDFF]">
          <thead className="border-b border-[#2d3748] text-xs uppercase text-[#E9DDFF]/60">
            <tr>
              <th className="px-4 py-3 font-medium">ID</th>
              <th className="px-4 py-3 font-medium">Nombre</th>
              <th className="px-4 py-3 font-medium">Cantidad</th>
              <th className="px-4 py-3 font-medium">Precio</th>
              <th className="px-4 py-3 font-medium">Categoría</th>
              <th className="w-10 px-4 py-3 text-right font-medium">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#2d3748]">
            {products.map((product) => (
              <tr key={product.id} className="transition-colors hover:bg-[#1f2937]">
                <td className="whitespace-nowrap px-4 py-3">{product.id}</td>
                <td className="px-4 py-3 font-medium">{product.name}</td>
                <td className="px-4 py-3">{product.quantity}</td>
                <td className="whitespace-nowrap px-4 py-3">${product.price}</td>
                <td className="px-4 py-3">
                  <span className="inline-block rounded-full bg-[#E9DDFF]/10 px-3 py-1 text-xs font-semibold text-[#E9DDFF]">
                    {product.category?.name ?? "—"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => onEdit?.(product)}
                      title="Editar"
                      aria-label="Editar producto"
                      className="rounded-md p-1.5 text-[#E9DDFF]/60 transition-colors hover:bg-[#E9DDFF]/10 hover:text-[#E9DDFF]"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(product.id)}
                      title="Eliminar"
                      aria-label="Eliminar producto"
                      className="rounded-md p-1.5 text-red-400/70 transition-colors hover:bg-red-500/10 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}