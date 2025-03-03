import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../firebase/config';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, getDoc, onSnapshot } from 'firebase/firestore';

interface User {
    id: string; // ID của người dùng
    name: string; // Tên người dùng
    lixi: number; // Số lì xì
    luotLac: number;
    createdAt: string; // Thời gian tạo
}

interface UserState {
    data: User[];
    loading: boolean;
    error: string | null;
    lixi: number | null;
}

const initialState: UserState = {
    data: [],
    loading: false,
    error: null,
    lixi: null,
};

// Fetch all users (Read)
export const fetchUsers = createAsyncThunk<User[], void>(
    'users/fetchUsers',
    async () => {
        const snapshot = await getDocs(collection(firestore, 'users'));
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            createdAt: doc.data().createdAt?.toDate().toISOString() || '',
        })) as User[];
    }
);

export const fetchLixiById = createAsyncThunk<number, string>(
    'users/fetchLixiById',
    async (userId, { rejectWithValue }) => {
        try {
            const userRef = doc(firestore, 'users', userId);
            const userSnap = await getDoc(userRef);

            if (!userSnap.exists()) {
                return rejectWithValue('User not found');
            }

            const data = userSnap.data();
            return data.lixi ?? 0; // Nếu `lixi` không tồn tại, trả về 0
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Unknown error');
        }
    }
);

export const listenLixiById = (userId: string) => (dispatch: any) => {
    const userRef = doc(firestore, 'users', userId);

    const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
            const data = docSnap.data();
            dispatch(setLixi(data.lixi?.toString() || '0')); // Cập nhật Redux state
        }
    }, (error) => {
        dispatch(setError(error.message || 'Lỗi khi lấy dữ liệu'));
    });

    return unsubscribe; // Trả về hàm hủy theo dõi
};


export const fetchUserById = createAsyncThunk<User, string>(
    'users/fetchUserById',
    async (userId) => {
        const userRef = doc(firestore, 'users', userId);
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) throw new Error('User not found');
        return { id: userSnap.id, ...userSnap.data() } as User;
    }
);
// Add a new user (Create)
export const addUser = createAsyncThunk<User, Omit<User, 'id'> & { khoLocId: string }>(
    'users/addUser ',
    async (newUser) => {
        const userWithAdditionalFields = {
            ...newUser,
            // createdAt: new Date().toISOString(), // Thêm thời gian tạo
        };

        const docRef = await addDoc(collection(firestore, 'users'), userWithAdditionalFields);
        return { id: docRef.id, ...userWithAdditionalFields }; // Trả về người dùng mới với ID
    }
);

// Update an existing user (Update)
export const updateUser = createAsyncThunk<User, User>(
    'users/updateUser ',
    async (updatedUser) => {
        const { id, ...data } = updatedUser;
        const userDoc = doc(firestore, 'users', id);
        await updateDoc(userDoc, data);
        return updatedUser; // Trả về người dùng đã cập nhật
    }
);

export const fetchLuotLacById = createAsyncThunk<number, string>(
    'users/fetchLuotLacById',
    async (userId) => {
        const userRef = doc(firestore, 'users', userId);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) throw new Error('User not found');

        const data = userSnap.data();
        return data.luotLac || 0; // Trả về số lượt lắc (nếu không có thì trả về 0)
    }
);


// Delete a user (Delete)
export const deleteUser = createAsyncThunk<string, string>(
    'users/deleteUser ',
    async (userId) => {
        const userDoc = doc(firestore, 'users', userId);
        await deleteDoc(userDoc); // Xóa người dùng khỏi Firestore
        return userId; // Trả về ID của người dùng đã xóa
    }
);

export const updateLixi = createAsyncThunk<
    { userId: string; lixi: number },
    { userId: string; lixi: number }
>(
    'users/updateLixi',
    async ({ userId, lixi }, { rejectWithValue }) => {
        try {
            const userRef = doc(firestore, 'users', userId);
            await updateDoc(userRef, { lixi });

            return { userId, lixi }; // Trả về dữ liệu đã cập nhật
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : 'Lỗi không xác định');
        }
    }
);



const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setLixi: (state, action) => {
            state.lixi = Number(action.payload) || 0;
        },
        setError: (state, action) => {
            state.error = action.payload; // Lưu lỗi nếu có
        }
    },
    extraReducers: (builder) => {
        builder
            // Fetch LuotLac by ID
            .addCase(fetchLuotLacById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLuotLacById.fulfilled, (state, action) => {
                state.loading = false;
                const user = state.data.find(user => user.id === action.meta.arg);
                if (user) {
                    user.luotLac = action.payload; // Cập nhật số lượt lắc của user
                }
            })
            .addCase(fetchLuotLacById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Lỗi khi lấy số lượt lắc';
            })

            // Fetch Users
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true; // Đang tải
            })

            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false; // Đã tải xong
                state.data = action.payload; // Cập nhật danh sách người dùng
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false; // Đã tải xong
                state.error = action.error.message || 'Something went wrong'; // Cập nhật thông báo lỗi
            })
            // Add User
            .addCase(addUser.fulfilled, (state, action) => {
                state.data.push(action.payload); // Thêm người dùng mới vào danh sách
            })
            .addCase(addUser.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to add user'; // Cập nhật thông báo lỗi
            })
            // Update User
            .addCase(updateUser.fulfilled, (state, action) => {
                const index = state.data.findIndex(user => user.id === action.payload.id);
                if (index !== -1) {
                    state.data[index] = action.payload; // Cập nhật thông tin người dùng
                }
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to update user'; // Cập nhật thông báo lỗi
            })
            // Delete User
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter(user => user.id !== action.payload); // Xóa người dùng khỏi danh sách
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.error = action.error.message || 'Failed to delete user'; // Cập nhật thông báo lỗi
            })
            // Fetch Lixi by ID
            .addCase(fetchLixiById.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchLixiById.fulfilled, (state, action) => {
                state.loading = false;
                // state.lixi = action.payload.toString(); // Chuyển thành string nếu cần
            })
            .addCase(fetchLixiById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string || 'Lỗi khi lấy dữ liệu';
            })
            .addCase(updateLixi.fulfilled, (state, action) => {
                const { userId, lixi } = action.payload;
                const user = state.data.find(user => user.id === userId);
                if (user) {
                    user.lixi = lixi; // Cập nhật Redux state
                }
            })
            .addCase(updateLixi.rejected, (state, action) => {
                state.error = action.error.message || 'Lỗi khi cập nhật lì xì';
            });



    },
});


export const { setLixi, setError } = userSlice.actions;
export default userSlice.reducer;