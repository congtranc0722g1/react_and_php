import './App.css';
import ProductList from './components/ProductList';
import ProductCreate from './components/ProductCreate';
import ProductUpdate from './components/ProductUpdate';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
    <Routes>
    <Route path="/" element={<ProductList />} />
    <Route path="/add" element={<ProductCreate />} />
    <Route path="/edit/:id" element={<ProductUpdate />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;
