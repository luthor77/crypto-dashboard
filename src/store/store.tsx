import { configureStore } from '@reduxjs/toolkit';
import coinsSlice from '../state/coinsSlice';
export default configureStore({
  reducer: {
    coins: coinsSlice,
  },
});
