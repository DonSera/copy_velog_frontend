import {createSlice} from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
    name: 'userInfo',
    initialState: {
        email: null,
        name: null,
        id: null,
    },
    reducers: {
        userLogin: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
            state.id = action.payload.id;
        },
        userLogout: (state) => {
            state.email = null;
            state.name = null;
            state.id = null;
        },
        changeName: (state, action) => {
            state.name = action.payload.name;
        }
    },
})

export const {userLogin, userLogout, changeName} = userInfoSlice.actions
export default userInfoSlice.reducer