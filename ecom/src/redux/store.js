import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import authRedux from './auth.redux'
import cartRedux from './cart.redux'
import productFilterRedux from './product.filter.redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  blacklist : ['filter']
}

const reducer = combineReducers({
  auth : authRedux,
  cart : cartRedux,
  filter : productFilterRedux,
})

const persistedReducer = persistReducer(persistConfig, reducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware : (getDefaultMiddleware) =>  getDefaultMiddleware({
    serializableCheck : false,
  })
})

export const persistor = persistStore(store);

export default store;