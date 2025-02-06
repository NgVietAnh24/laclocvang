// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import { firestore } from '../firebase/config';
// import { collection, getDocs, addDoc, deleteDoc, doc, query, where } from 'firebase/firestore';

// interface Result {
//     id: string;
//     co: string;
//     xuong: string;
//     khop: string;
//     deKhang: string;
// }

// interface ResultState {
//     data: Result[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: ResultState = {
//     data: [],
//     loading: false,
//     error: null,
// };

// // Fetch all results
// export const fetchResults = createAsyncThunk<Result[], void>(
//     'results/fetchResults',
//     async () => {
//         const snapshot = await getDocs(collection(firestore, 'results'));
//         return snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//         })) as Result[];
//     }
// );

// // Add a new result
// export const addResult = createAsyncThunk<Result, Omit<Result, 'id' | 'createdAt'>>(
//     'results/addResult',
//     async (newResult) => {
//         const resultWithDate = {
//             ...newResult,
//         };

//         const docRef = await addDoc(collection(firestore, 'results'), resultWithDate);
//         return { id: docRef.id, ...resultWithDate } as Result;
//     }
// );

// export const deleteResultById = createAsyncThunk<void, string>(
//     'results/deleteResultById',
//     async (resultId) => {
//         const resultDoc = doc(firestore, 'results', resultId); // Lấy tài liệu theo id
//         await deleteDoc(resultDoc); // Xóa tài liệu
//     }
// );

// const resultsSlice = createSlice({
//     name: 'results',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Fetch Results
//             .addCase(fetchResults.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchResults.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = action.payload;
//             })
//             .addCase(fetchResults.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message || 'Failed to fetch results';
//             })
//             // Add Result
//             .addCase(addResult.fulfilled, (state, action) => {
//                 state.data.push(action.payload);
//             })
//             .addCase(addResult.rejected, (state, action) => {
//                 state.error = action.error.message || 'Failed to add result';
//             })
//             // Delete Results by id
//             .addCase(deleteResultById.fulfilled, (state, action) => {
//                 // Xóa kết quả khỏi state theo id
//                 state.data = state.data.filter(result => result.id !== action.meta.arg);
//             })
//             .addCase(deleteResultById.rejected, (state, action) => {
//                 state.error = action.error.message || 'Failed to delete result';
//             });
//     },
// });

// export default resultsSlice.reducer;
