import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../types';

interface ProductState {
  items: Product[];
  filteredItems: Product[];
  favorites: number[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
}

const initialState: ProductState = {
  items: [],
  filteredItems: [],
  favorites: [],
  loading: false,
  error: null,
  searchQuery: '',
};

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://dummyjson.com/products');
  if (!response.ok) throw new Error('Failed to fetch products');
  const data = await response.json();
  return data.products;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const index = state.favorites.indexOf(id);
      if (index >= 0) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(id);
      }
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload || '';
      const query = (action.payload || '').toLowerCase();
      state.filteredItems = (state.items || []).filter(item => 
        (item.title || '').toLowerCase().includes(query) || 
        (item.description || '').toLowerCase().includes(query) ||
        (item.category || '').toLowerCase().includes(query)
      );
    },
    resetProducts: (state) => {
      state.searchQuery = '';
      state.filteredItems = state.items;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.loading = false;
        state.items = action.payload;
        // Apply current search filter
        const query = (state.searchQuery || '').toLowerCase();
        state.filteredItems = action.payload.filter(item => 
          (item.title || '').toLowerCase().includes(query)
        );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Something went wrong';
      });
  },
});

export const { setSearchQuery, resetProducts, toggleFavorite } = productSlice.actions;
export default productSlice.reducer;
