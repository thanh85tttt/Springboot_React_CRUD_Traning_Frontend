import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

//Thunk is middleware using to access api in redux
const middleware = [thunk];

/**
 * Store contain all states in root reducer and config redux devtool
 */
const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch