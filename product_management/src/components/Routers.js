import { Routes, Route } from 'react-router-dom';
import ProductCreate from './ProductCreate';

function Router (){
    return(
        <Routes>
        <Route path="/add" element={<ProductCreate />} />
      </Routes>
    );
}
export default Router;