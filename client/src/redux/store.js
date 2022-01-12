import {configureStore} from "@reduxjs/toolkit";
import authReducer from "./ducks/auth/authSlice"
import usersReducer from "./ducks/users/usersSlice"

export default configureStore({
    reducer: {
        authState: authReducer,
        usersState: usersReducer
    }
})