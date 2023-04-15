import { createSlice } from '@reduxjs/toolkit';

localStorage.setItem(
  'categories',
  JSON.stringify([{ name: 'Прочие', color: 'black' }]),
);
localStorage.setItem(
  'selectedCategory',
  JSON.stringify({ name: 'Прочие', color: 'black' }),
);

const categories = JSON.parse(localStorage.getItem('categories'));
const selectedCategory = JSON.parse(localStorage.getItem('selectedCategory'));

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    categories: categories,
    selectedCategory: selectedCategory,
  },
  reducers: {
    addCategory: (state, action) => {
      let thisCategoryExists = false;

      state.categories.forEach((item) => {
        if (item.name === action.payload.name) {
          thisCategoryExists = true;
        }
      });

      if (!thisCategoryExists) {
        state.categories.push(action.payload);
      }
    },
    selectCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    updateCategory: (state, action) => {
      state.categories.forEach((item) => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
        }

        state.selectedCategory.name = action.payload.name;
      });
    },
    removeCategory: (state, action) => {
      const newArray = state.categories.filter((item) => {
        if (item.id !== action.payload) {
          return true;
        } else {
          return false;
        }
      });

      return newArray;
    },
  },
});

export const { addCategory, selectCategory, updateCategory, removeCategory } =
  categorySlice.actions;
export default categorySlice.reducer;
