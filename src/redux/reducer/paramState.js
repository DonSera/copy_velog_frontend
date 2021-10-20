import {createSlice} from "@reduxjs/toolkit";

export const paramStateSlice = createSlice({
    name: 'paramState',
    initialState: {
        writerName : null,
        postId : null,
    },
    reducers: {
        setWriterName: (state, action) => {
            state.writerName = action.payload.name;
        },
        setPostId: (state, action) => {
            state.postId = action.payload.id;
        }
    }
})

export const {setWriterName, setPostId} = paramStateSlice.actions
export default paramStateSlice.reducer