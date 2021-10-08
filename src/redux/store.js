import {configureStore} from "@reduxjs/toolkit";
import loginReducer from "./loginSlice";

export default configureStore({
    reducer: {
        userInfo: loginReducer,
    }
})