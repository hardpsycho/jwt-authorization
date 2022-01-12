import LoginForm from "./components/LoginForm";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {checkAuth} from "../redux/ducks/auth/authSlice";

const App = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(state => state.authState.isAuth)
    const userEmail = useSelector(state => state.authState.user.email)
    const isLoading = useSelector(state => state.authState.isLoading)

    useEffect(() => {
        if(localStorage.getItem("token")){
            console.log(`токен найден - ${localStorage.getItem("token")}`)
            dispatch(checkAuth())
        }
    }, [])

    if(isLoading) {
        return <div>Загрузочка...</div>
    }

    return (
        <>
            <h1>{isAuth ? `Вы зашли как ${userEmail}` : "Войдите или будете уничтожены"}</h1>
            <LoginForm />
        </>
    );
};

export default App;