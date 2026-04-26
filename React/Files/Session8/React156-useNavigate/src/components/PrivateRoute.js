import React from 'react'
import { isLogin } from './../utils'
import { Navigate, Outlet } from 'react-router-dom'

export default function Panel({ children }) {

    let isUserLogin = isLogin('mohammad')

    console.log(isUserLogin);

    return (
        <div>
            {
                isUserLogin ? (
                    <Outlet />
                ) : (
                    <Navigate to='/login' />
                )
            }
        </div>
    )
}
