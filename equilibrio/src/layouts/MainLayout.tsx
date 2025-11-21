import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../components/SideBar/SideBar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function MainLayout() {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) navigate("/");
  }, [navigate]);

  return (
    <div className="flex min-h-screen bg-[var(--background)] text-[var(--text-primary)] transition-colors overflow-hidden">

      {/* Sidebar Desktop */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>

      {/* Sidebar Mobile */}
      {isMobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          <div className="fixed top-0 left-0 w-64 h-full z-50 md:hidden">
            <Sidebar isMobile onClose={() => setIsMobileMenuOpen(false)} />
          </div>
        </>
      )}

      <main className="flex-1 flex flex-col w-full min-w-0 bg-[var(--background)] transition-colors">

        <Header
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          isMobileMenuOpen={isMobileMenuOpen}
        />

        <section className="p-4 sm:p-6 md:p-8 flex-1 w-full min-w-0">
          <Outlet />
        </section>

        <Footer />
      </main>
    </div>
  );
}
