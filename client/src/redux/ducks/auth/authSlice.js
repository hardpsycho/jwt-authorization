import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import AuthService from "../../../services/AuthService";

let initState = {
    user: {},
    isAuth: false
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
            console.log(e);
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
            console.log(e);
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

    }
})

export const {setUser, setIsAuth} = authSlice.actions
export default authSlice.reducer