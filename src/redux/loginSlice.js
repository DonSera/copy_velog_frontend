import {createSlice} from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name: 'userInfo',
    initialState: {
        email: 'default_email',
        name: 'default_name'
    },
    reducers: {
        login: (state, action) => {
            state.email = action.payload.email;
            state.name = action.payload.name;
        },
    },
})

export const {login} = loginSlice.actions
export default loginSlice.reducer