import {createSlice} from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'userInfo',
    initialState: {
        email: null,
        name: null
    },
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
        logout:(state)=>{
            state.email = null;
            state.name = null;
        }
    },
})

export const {login, logout} = loginSlice.actions
export default loginSlice.reducer