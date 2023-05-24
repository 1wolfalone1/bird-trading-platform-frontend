import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./container/common/layout/Layout";
import Home from "./container/home/Home";
import SignUp from "./container/signup/SignUp";
import "./style/fontLoader.scss";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/" element={<SignUp />} />
      </Route>
    </Routes>
  );
}

export default App;
