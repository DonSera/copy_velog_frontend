import {createSlice} from "@reduxjs/toolkit";

export const loginStateSlice = createSlice({
    name: 'loginState',
    initialState: {
        bool: false
    },
    reducers: {
        state_login: (state) => {
            state.bool = true;
        },
        state_logout: (state) => {
            state.bool = false;
        }
    },
})

export const {state_login, state_logout} = loginStateSlice.actions
export default loginStateSlice.reducer