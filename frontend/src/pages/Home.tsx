import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DiscountBanner from "../components/DiscountBanner";
import HeroSection from "../components/HeroSection";
import SaleSlider from "../components/SaleSlider";
import NavBar from "../components/Navbar";
import Categories from "../components/Categories";
import AuthContext from "../context/AutrhProvider";
import { useContext } from "react";
export default function Home() {
  const context = useContext(AuthContext);
  const auth = context?.auth;
  console.log(auth);
  return (
    <div className="overflow-y-scroll h-screen overflow-x-hidden">
      <NavBar />
      <HeroSection />
      <SaleSlider />
      <DiscountBanner />
      <Categories />
    </div>
  );
}
