import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import PopupMessage from "./component/message/PopupMessage";
import Shop from "./component/shop/Shop";
import Checkout from "./container/checkout/Checkout";
import Layout from "./container/common/layout/Layout";
import CreateShop from "./container/create-shop/CreateShop";
import GetToken from "./container/get-token/GetToken";
import Home from "./container/home/Home";
import Login from "./container/login/Login";
import ForgotPassword from "./container/login/forgotPassword/ForgotPassword";
import ResetPassword from "./container/login/resetPassword/ResetPassword";
import VerifyCode from "./container/login/verifyCode/VerifyCode";
import CartContainer from "./container/order/CartContainer";
import {
  getCartSelector,
  invokeCart,
  userStatus,
} from "./container/order/cartSlice";
import ProductDetailsPage from "./container/product-details-page/ProductDetailsPage";
import Profile from "./container/profile/Profile";
import OrderHistory from "./container/purchase/order-history/OrderHistory";
import OrderStatus from "./container/purchase/order-status/OrderStatus";
import SignUp from "./container/signup/SignUp";
import VerifyCodeSignUp from "./container/signup/VerifyCode";
import { invokeUserInfo, userInfoSelector } from "./redux/global/userInfoSlice";
import ProductPageRoute from "./routes/ProductPageRoute";
import "./style/fontLoader.scss";
import Collection from "./component/shop/collection/Collection";
import Portfolio from "./component/shop/portfolio/Portfolio";

function App() {
  const cart = useSelector(getCartSelector);
  const userInfo = useSelector(userInfoSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    const userInfoObject = JSON.parse(localStorage.getItem("userInfo"));
    if (cart && Array.isArray(cart.items)) {
      dispatch(invokeCart(cart));
    }
    if (userInfoObject) {
      dispatch(invokeUserInfo(userInfoObject));
    }
  }, []);
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
        <Route path="sign-up" element={<SignUp />} />
        <Route path="products/*" element={<ProductPageRoute />} />
        <Route path="profile" element={<Profile />} />
        <Route path="cart" element={<CartContainer />} />
        <Route path="product/:id" element={<ProductDetailsPage />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="get-token" element={<GetToken />} />
        <Route path="popup-message" element={<PopupMessage />} />
        <Route path="order-history" element={<OrderHistory />} />
        <Route path="order-status/:id" element={<OrderStatus />} />
        <Route path="create-shop" element={<CreateShop />} />
        <Route path="shop/:id" element={<Shop />} />
        <Route path="shop/:id/collection" element={<Collection />} />
        <Route path="shop/:id/collection/:tagId" element={<Collection />} />
        <Route path="shop/:id/portfolio" element={<Portfolio />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="verify-code" element={<VerifyCode />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="verify-code-sign-up" element={<VerifyCodeSignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
