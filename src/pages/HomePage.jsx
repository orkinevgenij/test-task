import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../redux/slices/productSlice';
import ProductTable from '../components/ProductTable';
const HomePage = ({ products }) => {
  return <ProductTable products={products} />;
};

export default HomePage;
