import React from 'react'
import { isLogin } from './../utils'
import { Navigate } from 'react-router-dom'

export default function Panel() {

    let isUserLogin = isLogin('amir')

    console.log(isUserLogin);

    return (
        <div>
            {
                isUserLogin ? (
                    <h1 style={{ textAlign: 'center' }}>WelCome to Panel :)</h1>
                ) : (
                    <Navigate to='/login' />
                )
            }
        </div>
    )
}
