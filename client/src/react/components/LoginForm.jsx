import {useState} from "react";

const LoginForm = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

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
            <button>Логин</button>
            <button>Регистрация</button>
        </form>
    );
};

export default LoginForm;