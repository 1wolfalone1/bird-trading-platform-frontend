import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './container/common/layout/Layout'
import Home from './container/home/Home';
import './style/fontLoader.scss'
import Login from './container/login/Login';
import { createTheme } from '@mui/material/styles';
import blue from '@mui/material/colors/blue';


function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
      </Route>
    </Routes>
  );
}

export default App;
