import LoginForm from "./components/LoginForm";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "../redux/ducks/auth/authSlice";
import {fetchUsers} from "../redux/ducks/users/usersSlice";

const App = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.authState.isAuth)
    const userEmail = useSelector(state => state.authState.user.email)
    const isLoading = useSelector(state => state.authState.isLoading)
    const users = useSelector(state => state.usersState.users)
    const usersIsLoading = useSelector(state => state.usersState.isLoading)

    useEffect(() => {
        if(localStorage.getItem("token")){
            console.log(`токен найден - ${localStorage.getItem("token")}`)
            dispatch(checkAuth())
        }
    }, [])

    const clickFetchUsers = () => {
        dispatch(fetchUsers())
    }

    if(isLoading) {
        return <div>Загрузочка...</div>
    }

    return (
        <>
            <h1>{isAuth ? `Вы зашли как ${userEmail}` : "Войдите или будете уничтожены"}</h1>
            <LoginForm />
            {isAuth ? <button onClick={clickFetchUsers}>Получить пользователей</button> : ""}
            {users ? users.map(user => {
                return <div key={user._id}>{user.email}</div>
            }) : ""}
        </>
    );
};

export default App;