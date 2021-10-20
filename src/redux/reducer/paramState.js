import {createSlice} from "@reduxjs/toolkit";

export const paramStateSlice = createSlice({
    name: 'paramState',
    initialState: {
        writerName : null,
    },
    reducers: {
        setWriterName: (state, action) => {
            state.writerName = action.payload.name;
        },
        removeWriterName:(state) =>{
            state.writerName = null;
        }
    }
})

export const {setWriterName, removeWriterName} = paramStateSlice.actions
export default paramStateSlice.reducer