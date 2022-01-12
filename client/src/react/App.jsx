import LoginForm from "./components/LoginForm";
import store from "../redux/store"
import {Provider} from "react-redux";

const App = () => {
    return (
        <Provider store={store}>
            <LoginForm />
        </Provider>
    );
};

export default App;