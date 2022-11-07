import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga';
import authReducer from '../components/auth/authSlice';
import { createReduxHistoryContext } from 'redux-first-history';
import { createBrowserHistory } from 'history';
import dashboardReducer from '../components/Dashboard/dashboardSlice';
import studentReducer from '../components/Student/studentSlice'
import cityReducer from '../components/city/citySlice';

const { createReduxHistory, routerMiddleware, routerReducer } =
  createReduxHistoryContext({ history: createBrowserHistory() });

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    router: routerReducer,
    auth: authReducer,
    dashboard: dashboardReducer,
    student: studentReducer, 
    city: cityReducer, 
  },
  middleware: [sagaMiddleware, routerMiddleware],
});

sagaMiddleware.run(rootSaga);

export const history = createReduxHistory(store);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
