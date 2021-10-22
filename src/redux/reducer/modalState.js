import {createSlice} from "@reduxjs/toolkit";

export const modalStateSlice = createSlice({
    name: 'modalState',
    initialState: {
        open: false,
        title: ''
    },
    reducers: {
        open_modal: (state, action) => {
            state.open = true;
            state.title =  action.payload.title;
        },
        close_modal: (state) => {
            state.open = false;
            state.title =  '';
        },
    },
})

export const {open_modal, close_modal} = modalStateSlice.actions

export default modalStateSlice.reducer