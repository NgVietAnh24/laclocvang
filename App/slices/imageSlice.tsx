// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { storage } from '../firebase/config';
// import { ref, getDownloadURL } from 'firebase/storage';

// // Định nghĩa kiểu cho trạng thái
// interface ImageState {
//   imageUrls: string[]; // Mảng chứa URL của các ảnh
//   loading: boolean;
//   error: string | null;
// }

// // Trạng thái ban đầu
// const initialState: ImageState = {
//   imageUrls: [],
//   loading: false,
//   error: null,
// };

// // Fetch 2 image URLs từ Firebase Storage
// export const fetchImageUrls = createAsyncThunk<string[], string[]>(
//   'images/fetchImageUrls',
//   async (paths, { rejectWithValue }) => {
//     try {
//       const urls = await Promise.all(
//         paths.map(async (path) => {
//           const reference = ref(storage, path);
//           const url = await getDownloadURL(reference);
//           return url;
//         })
//       );
//       return urls;
//     } catch (error) {
//       if (error instanceof Error) {
//         return rejectWithValue(error.message);
//       }
//       return rejectWithValue('An unknown error occurred');
//     }
//   }
// );

// const imageSlice = createSlice({
//   name: 'images',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchImageUrls.pending, (state) => {
//         state.loading = true;
//         state.error = null; // Reset error khi bắt đầu fetch
//       })
//       .addCase(fetchImageUrls.fulfilled, (state, action) => {
//         state.loading = false;
//         state.imageUrls = action.payload; // Lưu mảng URL của các ảnh
//       })
//       .addCase(fetchImageUrls.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string; // Lưu thông báo lỗi
//       });
//   },
// });

// export default imageSlice.reducer;
