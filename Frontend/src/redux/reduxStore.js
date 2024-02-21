import { configureStore } from '@reduxjs/toolkit'
import AuthenticationSlice from './authentication/AuthenticationSlice'
import VendorSlice from './authentication/VendorSlice'


export default configureStore({
    reducer: {
        authentication_user: AuthenticationSlice,
        vendor_id: VendorSlice
    }
})
