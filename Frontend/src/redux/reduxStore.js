import { configureStore } from '@reduxjs/toolkit'
import AuthenticationSlice from './authentication/AuthenticationSlice'
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import {thunk} from 'redux-thunk';


const persistConfig = {
    key: 'authentication_user',
    storage,
}

const persistedReducer = persistReducer(persistConfig, AuthenticationSlice)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: [thunk]
})


export const persistor = persistStore(store)




// export default configureStore({
//     reducer: {
//         authentication_user: AuthenticationSlice,
//     }
// })