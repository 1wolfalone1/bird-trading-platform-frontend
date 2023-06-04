import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./container/common/layout/Layout";
import Home from "./container/home/Home";
import SignUp from "./container/signup/SignUp";
import "./style/fontLoader.scss";
import Login from "./container/login/Login";
import Profile from "./container/profile/Profile";
import CartContainer from "./container/order/CartContainer";
import ProductPageRoute from "./routes/ProductPageRoute";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import cartSlice, { getCartSelector } from "./container/order/cartSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
   const cart = useSelector(getCartSelector);
   const dispatch = useDispatch();
   useEffect(() => {
      const cartInvoke = localStorage.getItem("cart");
      const cartObject = JSON.parse(cartInvoke);
      if (cartObject) {
         dispatch(cartSlice.actions.invokeCart(cartObject));
      }
   }, []);
   useEffect(() => {
      if (cart.items !== null && cart.items.length > 0) {
         localStorage.setItem("cart", JSON.stringify(cart));
      }
   }, [cart]);
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="products/*" element={<ProductPageRoute />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<CartContainer />} />
         </Route>
      </Routes>
   );
}

export default App;
