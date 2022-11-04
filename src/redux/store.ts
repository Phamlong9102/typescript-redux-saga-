import { configureStore, ThunkAction, Action, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from './rootSaga'; 
import authReducer from "./auth/authSlice";
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const sagaMiddleware = createSagaMiddleware(); 
export const store = configureStore({
    reducer: {
        router: routerReducer, 
        auth: authReducer
    }, 
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware), 
})

sagaMiddleware.run(rootSaga); 

// export type AppDispatch = typeof store.dispatch; 
export const history = createReduxHistory(store);
export type RootState = ReturnType<typeof store.getState>; 
export type AppThunk<ReturnType = void> = ThunkAction< ReturnType, RootState, unknown, Action<string>> 

