import {createSlice} from '@reduxjs/toolkit'


export const authenticationSlice = createSlice(
   {
    name: 'authentication_user',
    initialState: {
      name: null,
      isAuthenticated: false,
      isAdmin: false,
      otp: null,
      isvendor: null,
      userid: null,
    },
    reducers: {
      Set_Authentication: (state, action) => {
        console.log(action);
        state.name = action.payload.name;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.isAdmin = action.payload.isAdmin
        state.otp = action.payload.otp
        state.isvendor = action.payload.isvendor
      },
    }
})

export const {Set_Authentication} =  authenticationSlice.actions

export default authenticationSlice.reducer