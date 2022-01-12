import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";
import axios from "axios";

let initState = {
    user: {},
    isAuth: false,
    isLoading: false
}

export const registration = createAsyncThunk(
    "jwt/registration",
    async ({email, password}, {dispatch}) => {
        console.log(email, password)
        try {
            const response = await AuthService.registration(email, password)
            console.log(response.data);
            localStorage.setItem("token", response.data.userToken)
            dispatch(setUser(response.data.user))
            dispatch(setIsAuth(true))
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
)

export const login = createAsyncThunk(
    "jwt/login",
    async ({email, password}, {dispatch}) => {
        console.log(email, password)
        try {
            const response = await AuthService.login(email, password)
            console.log(response.data);
            localStorage.setItem("token", response.data.userToken)
            dispatch(setUser(response.data.user))
            dispatch(setIsAuth(true))
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
)

export const logout = createAsyncThunk(
    "jwt/logout",
    async (undefined, {dispatch}) => {
        try {
            await AuthService.logout()
            localStorage.removeItem("token")
            dispatch(setUser({}))
            dispatch(setIsAuth(false))
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
)

export const checkAuth = createAsyncThunk(
    "jwt/checkAuth",
    async (undefined, {dispatch}) => {
        try {
            const response = await axios.get("http://localhost:5000/api/refresh", {withCredentials: true})
            console.log(response.data);
            localStorage.setItem("token", response.data.userToken)
            dispatch(setUser(response.data.user))
            dispatch(setIsAuth(true))
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
)

const authSlice = createSlice({
    name: "auth",
    initialState: initState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },

        setIsAuth: (state, action) => {
            state.isAuth = action.payload
        }
    },

    extraReducers: {
        [checkAuth.pending] : state => {
            state.isLoading = true
        },
        [checkAuth.fulfilled] : state => {
            state.isLoading = false
        }
    }
})

export const {setUser, setIsAuth} = authSlice.actions
export default authSlice.reducer