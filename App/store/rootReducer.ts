// store/rootReducer.ts
import { combineReducers } from 'redux';

// Ví dụ về một reducer đơn giản
const exampleReducer = (state = {}, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case 'EXAMPLE_ACTION':
            return { ...state, data: action.payload };
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    example: exampleReducer,
    // Thêm các reducer khác ở đây
});

export default rootReducer;