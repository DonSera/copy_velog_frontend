import {configureStore} from "@reduxjs/toolkit";
import userInfoReducer from "./userInfo";
import loginStateReducer from "./loginState";

export default configureStore({
    reducer: {
        userInfo: userInfoReducer,
        loginState : loginStateReducer
    }
})