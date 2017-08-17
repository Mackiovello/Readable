import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";
import { createStore, combineReducers, applyMiddleware } from "redux";
import posts from "./reducers/posts";
import categories from "./reducers/categories";
import comments from "./reducers/comments";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { reducer as reduxFormReducer } from "redux-form";
import thunk from "redux-thunk";

const combinedReducers = combineReducers({
  form: reduxFormReducer,
  posts,
  categories,
  comments
});

const store = createStore(
  combinedReducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
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
