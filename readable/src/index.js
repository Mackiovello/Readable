import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers } from "redux";
import posts from "./reducers/posts";
import categories from "./reducers/categories";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { reducer as reduxFormReducer } from "redux-form";

const combinedReducers = combineReducers({
  form: reduxFormReducer,
  posts,
  categories
})

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);

registerServiceWorker();
