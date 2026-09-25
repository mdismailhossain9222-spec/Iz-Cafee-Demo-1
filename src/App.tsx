import { AnimatePresence, motion } from "framer-motion";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { GoldCursor } from "./components/ui";
import AdminPage from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import ContactPage from "./pages/Contact";
import GalleryPage from "./pages/Gallery";
import Home from "./pages/Home";
import KnowUsPage from "./pages/KnowUs";
import LocationDetail from "./pages/LocationDetail";
import LocationsPage from "./pages/Locations";
import MenuPage from "./pages/Menu";
import StoryPage from "./pages/Story";

function Shell() {
  const location = useLocation();
  const admin = location.pathname.startsWith("/admin");

  return (
    <div className="relative min-h-screen bg-cream font-sans text-ink">
      <GoldCursor />
      {!admin && <Navbar />}
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/our-story" element={<StoryPage />} />
            <Route path="/get-to-know-us" element={<KnowUsPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/locations" element={<LocationsPage />} />
            <Route path="/locations/:slug" element={<LocationDetail />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </motion.main>
      </AnimatePresence>
      {!admin && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
