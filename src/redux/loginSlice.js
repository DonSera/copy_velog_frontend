import {createSlice} from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'userInfo',
    initialState: {
        email: null,
        name: null,
        id: null,
    },
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.id = action.payload.id;
        },
        logout: (state) => {
            state.email = null;
            state.name = null;
            state.id = null;
        }
    },
})

export const {login, logout} = loginSlice.actions
export default loginSlice.reducer