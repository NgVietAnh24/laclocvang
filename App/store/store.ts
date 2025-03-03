import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../slices/userSlice';
import imageReducer from '../slices/imageSlice';
import khoLocReducer from '../slices/khoLocSlice';

const store = configureStore({
  reducer: {
    users: userReducer,
    images: imageReducer,
    kholoc: khoLocReducer,
  },
  // Optional: Cách tùy chỉnh middleware
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Tùy chọn này có thể giúp tránh lỗi liên quan đến action không thể tuần tự hóa
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
