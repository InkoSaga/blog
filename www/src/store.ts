import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { applyMiddleware, combineReducers, compose, createStore, Reducer, ReducersMapObject } from "redux";

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] || compose;

let registry: ReducersMapObject = {
    root: (state: any = {}) => state
};

export const history = createBrowserHistory({basename: '/'});

const connectedRouter = connectRouter(history);

const store = createStore(
    connectedRouter(combineReducers(registry)),
    {
        root: {}
    },
    composeEnhancers(
        applyMiddleware(
            routerMiddleware(history)
        )
    ));

const update = (reducers: ReducersMapObject) => store.replaceReducer(connectedRouter(combineReducers(reducers)));

export const register = (name: string, reducer: Reducer) => {
    registry = { ...registry, [name]: reducer };
    update(registry);
}

export const deregister = (name: string) => {
    const { [name]: dummy, ...newRegistry } = registry;
    registry = newRegistry;
    update(registry);
}

export default store;
