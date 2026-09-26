# Inventory Frontend

Frontend en React para la **Prueba Técnica SUNUM (Etapa 1)** — consume la API de `Inventory-Backend`.

## 🛠️ Stack

React · TypeScript · Vite · Tailwind CSS · react-hook-form · zod · axios · react-router · sonner

## ✅ Requisitos

- Node.js 22+
- El **backend corriendo** en `http://localhost:3000`

## 🚀 Instalación y ejecución

```bash
git clone https://github.com/JazDzib/Inventory-Frontend.git
cd Inventory-Frontend
npm install
npm run dev
```

El frontend queda en `http://localhost:5173`.

> El proxy de Vite redirige `/api` → `http://localhost:3000`, así no hay que configurar URLs ni sufrir CORS en desarrollo.

## ✨ Funcionalidades

- **Tabla de productos** (ID, Nombre, Cantidad, Precio, Categoría, Acciones).
- **Crear y editar** producto en un modal con validaciones (react-hook-form + zod) antes de enviar.
- **Eliminar** con confirmación.
- **Paginación** (anterior/siguiente + página actual).
- **Errores visibles** del backend (400/404/409/500) vía toasts con el `message` de la API.
- Diseño limpio con estado de carga (skeleton) y columna de acciones con iconos.

## 🧠 Decisiones técnicas

- **Patrón contenedor/presentacional** — la página maneja el estado y las llamadas; los componentes solo muestran y avisan (datos bajan, eventos suben).
- **react-hook-form + zod** — validación con un esquema único; los errores salen del propio schema.
- **Tailwind CSS** — control total de estilos, sin frameworks de UI.
- **Interceptor de axios** — centraliza la extracción del `message` del backend en los toasts.

## 📁 Estructura

```
src/
├── types/        # Contratos de datos
├── services/     # Endpoints de la API (axios)
├── components/   # ProductTable, CreateProduct (form), Paginacion
├── routes/       # ProductPage (contenedor)
├── utils/        # Cliente axios con interceptor de errores
└── App.tsx       # Layout + rutas
```
