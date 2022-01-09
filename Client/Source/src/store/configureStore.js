import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import searchReducer from "../reducers/searchReducer";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Store Creation
export default () => {
    const store = createStore(
        combineReducers({
            searchData: searchReducer,
        }),
        composeEnhancers(applyMiddleware(thunk))
    );
    return store;
};
