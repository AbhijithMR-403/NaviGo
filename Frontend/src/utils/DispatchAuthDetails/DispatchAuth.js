import React from 'react'
import { Set_Authentication } from '../../redux/authentication/AuthenticationSlice';
import IsAuthUser from '../IsAuthUser';

const DispatchAuth = async(dispatch) => {

    const isAuthenticated = await IsAuthUser();
    dispatch(
      Set_Authentication({
        name: isAuthenticated.name,
        isAuthenticated: isAuthenticated.isAuthenticated,
        userId: isAuthenticated.user_id,
        isVendor: isAuthenticated.is_vendor,
      })
    );
}

export default DispatchAuth