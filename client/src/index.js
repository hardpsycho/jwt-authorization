import App from "./react/App";
import * as ReactDOM from "react-dom";
import store from "./redux/store";
import {Provider} from "react-redux";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>
    , document.getElementById("react-root"))