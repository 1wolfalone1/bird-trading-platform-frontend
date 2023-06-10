import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./container/common/layout/Layout";
import Home from "./container/home/Home";
import SignUp from "./container/signup/SignUp";
import "./style/fontLoader.scss";
import Login from "./container/login/Login";
import Profile from "./container/profile/Profile";
import CartContainer from "./container/order/CartContainer";
import Checkout from "./container/checkout/Checkout";
import ProductPageRoute from "./routes/ProductPageRoute";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import cartSlice, {
   getCartSelector,
   invokeCart,
   userStatus,
} from "./container/order/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import userInfoSlice, { userInfoSelector } from "./redux/global/userInfoSlice";
import ProductDetails from "./container/product-details/ProductDetails";
import GetToken from "./container/get-token/GetToken";

function App() {
   const cart = useSelector(getCartSelector);
   const userInfo = useSelector(userInfoSelector);
   const dispatch = useDispatch();

   useEffect(() => {
      const cartObject = JSON.parse(localStorage.getItem("cart"));
      const userInfoObject = JSON.parse(localStorage.getItem("userInfo"));
      if (cartObject && cartObject.items !== null) {
         dispatch(invokeCart(cartObject));
      }
      if (userInfoObject) {
         dispatch(userInfoSlice.actions.invokeUserInfo( userInfoObject ));
      }
   }, []);
   useEffect(() => {
      if (cart.items !== null && cart.items.length > 0) {
         localStorage.setItem("cart", JSON.stringify(cart));
      }
   }, [cart]);
   useEffect(() => {
      if (userInfo.status !== userStatus.GUEST) {
         localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
   }, [userInfo]);

   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="products/*" element={<ProductPageRoute />} />
            <Route path="profile" element={<Profile />} />
            <Route path="cart" element={<CartContainer />} />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="get-token" element={<GetToken />} />
         </Route>
      </Routes>
   );
}

export default App;
