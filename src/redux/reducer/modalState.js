import {createSlice} from "@reduxjs/toolkit";

export const modalStateSlice = createSlice({
    name: 'modalState',
    initialState: {
        modalInfo: {
            open: false,
            title: ''
        },
    },
    reducers: {
        open_modal: (state, action) => {
            state.modalInfo = {open: true, title: action.payload.title};
        },
        close_modal: (state) => {
            state.modalInfo = {open: false, title: ''};
        },
    },
})

export const {open_modal, close_modal} = modalStateSlice.actions

export default modalStateSlice.reducer