import {useState} from "react";
import {login, registration} from "../../redux/ducks/auth/authSlice";
import {useDispatch} from "react-redux";

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()

    const clickLogin = (e) => {
        e.preventDefault()
        console.log({email, password})
        dispatch(login({email, password}))
    }

    const clickRegistration = (e) => {
        e.preventDefault()
        dispatch(registration({email, password}))
    }

    return (
        <form>
            <input
                type={"text"}
                name={"email"}
                placeholder={"Введите email"}
                onChange={e => setEmail(e.target.value)}
                value={email}
            />
            <input
                type={"password"}
                name={"password"}
                placeholder={"Введите password"}
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            <button
                onClick={clickLogin}
            >
                Логин
            </button>
            <button
                onClick={clickRegistration}
            >
                Регистрация
            </button>
        </form>
    );
};

export default LoginForm;