import {
    Action,
    applyMiddleware,
    combineReducers,
    createStore
} from "redux";
import { PersistConfig, persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import UserReducer from './user/reducer';
import { IState as UserState } from './user/types';

export interface IAction<T, P = any> {
    type: T;
    payload?: P
}

export interface StoreState {
    User: UserState;
}

const persistConfig: PersistConfig = {
    debug: __DEV__,
    key: "root",
    storage,
    whitelist: ['AuthStore']
};

const rootReducer = combineReducers({
    User: UserReducer,
});



const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store);

export type IDispatch = IReduxDispatch<any>;

export type IThunkFunction<S = any> = (dispatch: IReduxDispatch<S>) => Promise<void> | void;

export type IReduxDispatch<S> = <A extends IThunkFunction<S> | Action>(action: A) => A;

