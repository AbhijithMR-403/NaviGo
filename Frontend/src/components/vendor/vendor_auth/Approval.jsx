import React from 'react'
import '../../../Style/vendor.scss'
import { AuthAxios } from '../../api/api_instance'

function Approval() {
    const refresh_token = localStorage.getItem('refresh');

    const logout = async () => {
        await AuthAxios.post('/logout', { refresh_token: refresh_token }, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
        ).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err);
        })
        localStorage.removeItem("access");
        window.location.reload();
    }
    return (
        <>
            <div className='vendor-approval-wating-page flex justify-center items-center mt-9'>
                <div className="card">
                    <div className="card-info">
                        <p className="title">Your Approval Request is in verification process.<br /> <br /> Will notify you Once it is completed
                        </p>
                    </div>
                </div>
            </div>
            <div className="justify-center text-center mt-8">
                <p className='cursor-pointer font-bold' onClick={() => logout()}>Log Out</p>
            </div>
        </>
    )
}

export default Approval