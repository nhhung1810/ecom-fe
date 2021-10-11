import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authRedux from './auth.redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
}

const reducer = combineReducers({
  auth : authRedux
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
})

export const persistor = persistStore(store);

export default store;