import { useEffect, useState } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import { NavBar } from './components/NavBar';
import { Layout } from './components/Layout';
import { AddProducts } from './pages/AddProducts';
import { useDispatch, useSelector } from 'react-redux';

import { UpdateProduct } from './pages/UpdateProduct';
import { fetchProducts } from './redux/slices/productSlice';
function App() {
  const dispatch = useDispatch();
  const { productCategories, products, searchProducts } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='' element={<Layout />}>
          <Route path='/test-task/' element={<HomePage products={products} />} />
          <Route path='/product-update/:id' element={<UpdateProduct />} />
          <Route path='/add-products' element={<AddProducts />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
