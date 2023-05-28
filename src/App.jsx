import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./container/common/layout/Layout";
import Home from "./container/home/Home";
import SignUp from "./container/signup/SignUp";
import "./style/fontLoader.scss";
import Login from "./container/login/Login";
import Profile from "./container/profile/Profile";

import ProductPageRoute from "./routes/ProductPageRoute";

function App() {
   return (
      <Routes>
         <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="products/*" element={<ProductPageRoute />}/>
              <Route path="/profile" element={<Profile />} />
         </Route>
      </Routes>
   );

}

export default App;
