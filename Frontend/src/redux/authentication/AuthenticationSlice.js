import {createSlice} from '@reduxjs/toolkit'


export const authenticationSlice = createSlice(
   {
    name: 'authentication_user',
    initialState: {
      name: null,
      isAuthenticated: false,
      isAdmin: false,
    },
    reducers: {
      Set_Authentication: (state, action) => {
        state.name = action.payload.name;
        state.isAuthenticated = action.payload.isAuthenticated;
        state.isAdmin = action.payload.isAdmin
      },
      
    }

})

export const {Set_Authentication} =  authenticationSlice.actions

export default authenticationSlice.reducer