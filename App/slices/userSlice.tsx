// import { createSlice, createAsyncThunk, createAction } from '@reduxjs/toolkit';
// // import { firestore } from '../firebase/config';
// import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

// interface User {
//     id: string;
//     name: string;
//     phone: string;
//     email: string;
//     contact: string;
//     createdAt: string;
// }

// interface UserState {
//     data: User[];
//     loading: boolean;
//     error: string | null;
// }

// const initialState: UserState = {
//     data: [],
//     loading: false,
//     error: null,
// };

// // Fetch all users (Read)
// export const fetchUsers = createAsyncThunk<User[], void>(
//     'users/fetchUsers',
//     async () => {
//         const snapshot = await getDocs(collection(firestore, 'users'));
//         return snapshot.docs.map(doc => ({
//             id: doc.id,
//             ...doc.data(),
//             createdAt: doc.data().createdAt?.toDate().toISOString() || '',
//         })) as User[];
//     }
// );

// // Add a new user (Create)
// export const addUser = createAsyncThunk<User, Omit<User, 'id'> & { resultId: string }>(
//     'users/addUser ',
//     async (newUser) => {
//         const userWithAdditionalFields = {
//             ...newUser,
//             phone: newUser.phone || '',
//             email: newUser.email || '',
//             contact: newUser.contact || '',
//             createdAt: newUser.createdAt || '',
//         };

//         const docRef = await addDoc(collection(firestore, 'users'), userWithAdditionalFields);
//         return { id: newUser.resultId, ...userWithAdditionalFields };
//     }
// );

// // Update an existing user (Update)
// export const updateUser = createAsyncThunk<User, User>(
//     'users/updateUser ',
//     async (updatedUser) => {
//         const { id, ...data } = updatedUser;
//         const userDoc = doc(firestore, 'users', id);
//         await updateDoc(userDoc, data);
//         return updatedUser;
//     }
// );

// // Delete a user (Delete)
// export const deleteUser = createAsyncThunk<string, string>(
//     'users/deleteUser ',
//     async (userId) => {
//         const userDoc = doc(firestore, 'users', userId);
//         return userId;
//     }
// );

// const userSlice = createSlice({
//     name: 'users',
//     initialState,
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             // Fetch Users
//             .addCase(fetchUsers.pending, (state) => {
//                 state.loading = true;
//             })
//             .addCase(fetchUsers.fulfilled, (state, action) => {
//                 state.loading = false;
//                 state.data = action.payload;
//             })
//             .addCase(fetchUsers.rejected, (state, action) => {
//                 state.loading = false;
//                 state.error = action.error.message || 'Something went wrong';
//             })
//             // Add User
//             .addCase(addUser.fulfilled, (state, action) => {
//                 state.data.push(action.payload);
//             })
//             .addCase(addUser.rejected, (state, action) => {
//                 state.error = action.error.message || 'Failed to add user';
//             })
//             // Update User
//             .addCase(updateUser.fulfilled, (state, action) => {
//                 const index = state.data.findIndex(user => user.id === action.payload.id);
//                 if (index !== -1) {
//                     state.data[index] = action.payload;
//                 }
//             })
//             .addCase(updateUser.rejected, (state, action) => {
//                 state.error = action.error.message || 'Failed to update user';
//             })
//             // Delete User
//             .addCase(deleteUser.fulfilled, (state, action) => {
//                 state.data = state.data.filter(user => user.id !== action.payload);
//             })
//             .addCase(deleteUser.rejected, (state, action) => {
//                 state.error = action.error.message || 'Failed to delete user';
//             });
//     },
// });

// export default userSlice.reducer;