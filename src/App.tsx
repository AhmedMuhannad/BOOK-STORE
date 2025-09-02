import { Routes, Route } from "react-router-dom";
import React from "react";
// import components
import Home from "./pages/Home";
import Details from "./pages/Details";
import Error404 from "./pages/Error404";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Category from "./pages/Category";
import PersistLogin from "./components/PersistLogin";
import Cart from "./pages/Cart";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
function App() {
  return (
    <div>
      {" "}
      <Routes>
        {" "}
        <Route element={<PersistLogin />}>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<div>Products</div>} />
          <Route path=":id/Details" element={<Details />} />
          <Route path="*" element={<Error404 />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path=":id/category" element={<Category />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/SignUp" element={<SignUp/>}/>
          <Route path="/Profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
