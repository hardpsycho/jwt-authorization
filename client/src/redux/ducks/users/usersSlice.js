import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {checkAuth, setIsAuth, setUser} from "../auth/authSlice";
import UserService from "../../../services/UserService";

export const fetchUsers = createAsyncThunk(
    "jwt/fetchUsers",
    async (undefined, {dispatch}) => {
        try {
            const response = await UserService.fetchUsers()
            console.log(response.data);
            dispatch(addUsers(response.data))
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }
)

const usersSlice = createSlice({
    name: "users",
    initialState: {users: [], isLoading: false},
    reducers: {
        addUsers: (state, action) => {
            state.users = action.payload
        },
        removeUsers: (state) => {
            state.users = []
        },
    },

    extraReducers: {
        [fetchUsers.pending] : state => {
            state.isLoading = true
        },
        [fetchUsers.fulfilled] : state => {
            state.isLoading = false
        }
    }
})

export const {addUsers, removeUsers} = usersSlice.actions
export default usersSlice.reducer