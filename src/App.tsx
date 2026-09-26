import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "./routes/ProductPage";
import { Toaster } from "sonner";


export default function App() {
  return (
    <div className="flex min-h-screen bg-[#111827] text-[#E9DDFF]">
      <main className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Navigate to="/products" replace />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="*" element={<p className="p-8">404 — no existe</p>} />
        </Routes>
      </main>
       <Toaster richColors />
    </div>
  );
}