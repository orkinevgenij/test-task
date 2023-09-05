import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('product/fetchProduct', async () => {
  try {
    const { data } = await axios.get(`https://dummyjson.com/products`);
    return data.products;
  } catch (error) {
    console.log(error);
  }
});

export const fetchProductCategories = createAsyncThunk(
  'product/fetchProductCategories',
  async () => {
    try {
      const { data } = await axios.get(`https://dummyjson.com/products/categories`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState = {
  products: [],
  search: null,
  searchProducts: [],
  productCategories: [],
  isLoading: false,
  error: null,
};
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const { id, title, description, price, rating, stock, category } = action?.payload;
      state.products.map((product) => {
        if (product.id === id) {
          product.id = id;
          product.title = title;
          product.description = description;
          product.price = price;
          product.rating = rating;
          product.stock = stock;
          product.category = category;
        }
      });
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter((product) => product.id !== action.payload);
    },
    filteredProducts: (state, action) => {
      state.products = state.searchProducts.filter((product) => {
        return (
          product.title.toLowerCase().includes(action.payload.toLowerCase()) ||
          product.description.toLowerCase().includes(action.payload.toLowerCase())
        );
      });
    },
  },
  extraReducers: {
    //fetch product
    [fetchProducts.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProducts.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.products = action.payload;
      state.searchProducts = action.payload;
    },
    [fetchProducts.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },

    //fetch category list
    [fetchProductCategories.pending]: (state) => {
      state.isLoading = true;
    },
    [fetchProductCategories.fulfilled]: (state, action) => {
      state.productCategories = action.payload;
      state.isLoading = false;
    },
    [fetchProductCategories.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const { addProduct, updateProduct, removeProduct, filteredProducts } = productSlice.actions;
export default productSlice.reducer;
