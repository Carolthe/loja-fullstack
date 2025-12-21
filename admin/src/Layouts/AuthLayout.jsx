// @ts-check
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "../Components/Layout/Header";
import Sidebar from "../Components/Layout/Sidebar";
import Categories from "../Pages/Auth/Categories/Categories";
import EditCategory from "../Pages/Auth/Categories/EditCategory";
import NewCategory from "../Pages/Auth/Categories/NewCategory";
import ViewCategory from "../Pages/Auth/Categories/ViewCategory";
import Dashboard from "../Pages/Auth/Dashboard";
import Newsletters from "../Pages/Auth/Newsletters/Newsletters";
import ViewNewsletter from "../Pages/Auth/Newsletters/ViewNewsletter";
import EditProduct from "../Pages/Auth/Products/EditProduct";
import NewProduct from "../Pages/Auth/Products/NewProduct";
import Products from "../Pages/Auth/Products/Products";
import ViewProduct from "../Pages/Auth/Products/ViewProduct";
import Users from "../Pages/Auth/Users/Users";
import ViewUser from "../Pages/Auth/Users/ViewUser";
import { Toast, ToastToggle } from "flowbite-react";
import { HiCheck, HiExclamation, HiX } from "react-icons/hi";
import useToast from "../Hooks/useToast";

export default function AuthLayout() {
  const { toast, message } = useToast();
  return (
    <div className="relative">
      <Header />
      <div className="flex min-h-[calc(100vh-56px)] min-w-screen bg-gray-800">
        <div className="mx-25 mt-25 flex w-full gap-10">
          <Sidebar />
          <div className="w-full">
            <main className="mb-4 flex items-center justify-between">
              <Router>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  {/* Listar, Criar, Ver, Editar */}
                  <Route path="/categorias" element={<Categories />} />
                  <Route path="/categorias/novo" element={<NewCategory />} />
                  <Route
                    path="/categorias/visualizar/:id"
                    element={<ViewCategory />}
                  />
                  <Route
                    path="/categorias/editar/:id"
                    element={<EditCategory />}
                  />
                  {/* Listar, Criar, Ver, Editar */}
                  <Route path="/produtos" element={<Products />} />
                  <Route path="/produtos/novo" element={<NewProduct />} />
                  <Route
                    path="/produtos/visualizar/:id"
                    element={<ViewProduct />}
                  />
                  <Route
                    path="/produtos/editar/:id"
                    element={<EditProduct />}
                  />
                  {/* Listar, Ver */}
                  <Route path="/newsletters" element={<Newsletters />} />
                  <Route
                    path="/newsletters/visualizar/:id"
                    element={<ViewNewsletter />}
                  />
                  {/* Listar, Ver */}
                  <Route path="/usuarios" element={<Users />} />
                  <Route
                    path="/usuarios/visualizar/:id"
                    element={<ViewUser />}
                  />
                </Routes>
              </Router>
            </main>
            <div className="mt-4 w-full"></div>
          </div>
        </div>
      </div>
      <div className="absolute top-8 right-8 flex flex-col gap-4">
        {toast === "success" && message !== "" && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <HiCheck className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <ToastToggle className="cursor-pointer" />
          </Toast>
        )}
        {toast === "danger" && message !== "" && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200">
              <HiX className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <ToastToggle className="cursor-pointer" />
          </Toast>
        )}
        {toast === "warning" && message !== "" && (
          <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
              <HiExclamation className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">{message}</div>
            <ToastToggle className="cursor-pointer" />
          </Toast>
        )}
      </div>
    </div>
  );
}
