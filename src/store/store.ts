import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from '@redux-saga/core';

import rootSaga from './saga';
import authReducer from './auth/reducers';

const sagaMiddleWare = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false }), sagaMiddleWare];

const store = configureStore({
  reducer: { auth: authReducer },
  middleware
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

sagaMiddleWare.run(rootSaga);

export default store;
