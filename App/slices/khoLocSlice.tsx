import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { firestore } from '../firebase/config';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';

interface KhoLoc {
    id: string; // Firestore ID luôn là string
    name: string;
    status: "Chưa nhận" | "Đã nhận";
    quantity: number;
    image?: number; // Định dạng số cho image
    code?: string;
}

interface KhoLocState {
    data: KhoLoc[];
    loading: boolean;
    error: string | null;
}

const initialState: KhoLocState = {
    data: [],
    loading: false,
    error: null,
};

// 🟢 Fetch danh sách từ Firestore
export const fetchKhoLoc = createAsyncThunk<KhoLoc[], void>(
    'kholoc/fetchResults',
    async (_, { rejectWithValue }) => {
        try {
            const snapshot = await getDocs(collection(firestore, 'kholoc'));
            return snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            })) as KhoLoc[];
        } catch (error: any) {
            return rejectWithValue(error.message || "Lỗi khi tải danh sách kho lộc");
        }
    }
);

export const addRewardToKhoLoc = createAsyncThunk(
    'khoLoc/addReward',
    async (rewards: { name: string; code: string; image: string }[], { rejectWithValue }) => {
        try {
            const promises = rewards.map(async (reward) => {
                await addDoc(collection(firestore, 'kholoc'), {
                    ...reward,
                    status: 'Chưa nhận',
                });
            });

            await Promise.all(promises);
            return rewards; // Trả về danh sách đã thêm thành công
        } catch (error) {
            console.error('Lỗi khi thêm phần thưởng vào kho lộc:', error);
            return rejectWithValue(error);
        }
    }
);

// 🟢 Thêm dữ liệu vào Firestore với logic tự động đặt `image`
export const addKhoLoc = createAsyncThunk<KhoLoc, Omit<KhoLoc, 'id'>>(
    'kholoc/addResult',
    async (newResult, { rejectWithValue }) => {
        try {
            const image =
                newResult.name === "1 chỉ vàng PNJ 9.999" ? 1 :
                    newResult.name === "Nửa chỉ vàng PNJ 9.999" ? 2 : 0; // Mặc định image = 0 nếu không khớp

            const docRef = await addDoc(collection(firestore, 'kholoc'), { ...newResult, image });
            return { id: docRef.id, ...newResult, image } as KhoLoc;
        } catch (error: any) {
            return rejectWithValue(error.message || "Lỗi khi thêm kho lộc");
        }
    }
);

// 🟢 Xóa dữ liệu từ Firestore theo ID
export const deleteKhoLocById = createAsyncThunk<string, string>(
    'kholoc/deleteKhoLocById',
    async (resultId, { rejectWithValue }) => {
        try {
            await deleteDoc(doc(firestore, 'kholoc', resultId));
            return resultId;
        } catch (error: any) {
            return rejectWithValue(error.message || "Lỗi khi xóa kho lộc");
        }
    }
);

const khoLocSlice = createSlice({
    name: 'kholoc',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // 🔄 Fetch Data
            .addCase(fetchKhoLoc.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchKhoLoc.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(fetchKhoLoc.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            // 🔄 Add Data
            .addCase(addKhoLoc.fulfilled, (state, action) => {
                state.data.push(action.payload);
            })
            .addCase(addKhoLoc.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            // 🔄 Delete Data
            .addCase(deleteKhoLocById.fulfilled, (state, action) => {
                state.data = state.data.filter(item => item.id !== action.payload);
            })
            .addCase(deleteKhoLocById.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

export default khoLocSlice.reducer;
