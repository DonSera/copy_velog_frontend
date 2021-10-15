import {createSlice} from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        email: null,
        name: null,
        id: null,
    },
    reducers: {
        login_user: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.id = action.payload.id;
        },
        logout_user: (state) => {
            state.email = null;
            state.name = null;
            state.id = null;
        },
        change_name: (state, action) => {
            state.name = action.payload.name;
        }
    },
})

export const {login_user, logout_user, change_name} = userInfoSlice.actions
export default userInfoSlice.reducer