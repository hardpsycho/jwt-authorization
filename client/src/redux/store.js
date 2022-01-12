import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./ducks/auth/authSlice"

export default configureStore({
    reducer: {
        authState: authReducer
    }
})