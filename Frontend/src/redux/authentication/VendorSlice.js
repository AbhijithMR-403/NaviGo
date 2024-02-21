import { createSlice } from '@reduxjs/toolkit'


export const VendorSlice = createSlice(
    {
        name: 'vendor_id',
        initialState: {
            userID: null,
        },
        reducers: {
            set_vendor: (state, action) => {
                console.log('Vendor redux reducer ::::\n', action);
                state.userID = action.payload.userID;
            },
        }
    })

export const { set_vendor } = VendorSlice.actions

export default VendorSlice.reducer