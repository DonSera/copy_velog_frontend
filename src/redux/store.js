import {configureStore} from "@reduxjs/toolkit";
import userInfoReducer from "./reducer/userInfo";
import loginStateReducer from "./reducer/loginState";
import modalStateReducer from './reducer/modalState'

export default configureStore({
    reducer: {
        userInfo: userInfoReducer,
        loginState: loginStateReducer,
        modalState: modalStateReducer
    }
})