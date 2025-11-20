import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Sidebar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, []);

  return (
    <div className="
      flex 
      min-h-screen 
      bg-[var(--background)]
      text-[var(--text-primary)]
      transition-colors
    ">
      <Sidebar />

      <main className="flex-1 flex flex-col bg-[var(--background)] transition-colors">
        
        <Header />

        <section className="p-8 flex-1 bg-[var(--background)] transition-colors">
          <Outlet />
        </section>

        <Footer />
      </main>
    </div>
  );
}
