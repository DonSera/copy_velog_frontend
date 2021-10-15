import {createSlice} from "@reduxjs/toolkit";

export const modalStateSlice = createSlice({
    name: 'modalState',
    initialState: {
        login: {
            open: false,
            title: ''
        },
        changeName: false
    },
    reducers: {
        openLogin: (state, action) => {
            state.login = {open: true, title: action.payload.title};
        },
        closeLogin: (state) => {
            state.login = {open: false, title: ''};
        },
        openChangeName: (state) => {
            state.changeName = true;
        },
        closeChangeName: (state) => {
            state.changeName = false;
        }
    },
})

export const {openLogin, closeLogin, openChangeName, closeChangeName} = modalStateSlice.actions

export default modalStateSlice.reducer