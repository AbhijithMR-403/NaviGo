import { configureStore } from '@reduxjs/toolkit'
import AuthenticationSlice from './authentication/AuthenticationSlice'


export default configureStore({
    reducer: {
        authentication_user: AuthenticationSlice,
    }
})
