import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DiscountBanner from "../components/DiscountBanner";
import HeroSection from "../components/HeroSection";
import SaleSlider from "../components/SaleSlider";
import NavBar from "../components/Navbar";
import Categories from "../components/Categories";
import AuthContext from "../context/AutrhProvider";
import { useContext } from "react";
import ZShaped from "../components/ZShaped";
export default function Home() {
  const context = useContext(AuthContext);
  const auth = context?.auth;
  console.log(auth);
  return (
    <div className=" ">
      <NavBar />
      <HeroSection />
      <SaleSlider />
      <DiscountBanner />
      {/* <Categories /> */}
      <ZShaped />
    </div>
  );
}
