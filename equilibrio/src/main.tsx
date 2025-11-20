import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App.tsx";
import "./globals.css";

import Error from "./routes/Error/Error.tsx";
import Login from "./routes/Login/Login.tsx";
import Register from "./routes/Register/Register.tsx";
import Home from "./routes/Home/Home.tsx";
import MainLayout from "./layouts/MainLayout.tsx";
import Tarefas from "./routes/Tarefas/Tarefas.tsx";
import Perfil from "./routes/Perfil/index.tsx";
import Categorias from "./routes/Categorias/index.tsx";
import Integrantes from "./routes/Integrantes/index.tsx";
import FAQ from "./routes/Faq/index.tsx";
import About from "./routes/About/index.tsx";
import ThemeProvider from "./context/ThemeProvider.tsx";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        element: <MainLayout />,
        children: [
          { path: "/home", element: <Home /> },
          { path: "/tarefas", element: <Tarefas /> },
          { path: "/categorias", element: <Categorias /> },
          { path: "/perfil", element: <Perfil /> },
          { path: "/integrantes", element: <Integrantes /> },
          { path: "/faq", element: <FAQ /> },
          { path: "/about", element: <About /> }
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>
);
