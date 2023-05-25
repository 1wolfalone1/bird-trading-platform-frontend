import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './container/common/layout/Layout'
import Home from './container/home/Home';
import './style/fontLoader.scss'

function App() {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route index element={<Home/>}/>
      </Route>
    </Routes>
  );
}

export default App;
