import {createSlice} from "@reduxjs/toolkit";

export const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: {
        bool: false
    },
    reducers: {
        stateLogin: (state) => {
            state.bool = true;
        },
        stateLogout: (state) => {
            state.bool = false;
        }
    },
})

export const {stateLogin, stateLogout} = loginStateSlice.actions
export default loginStateSlice.reducer