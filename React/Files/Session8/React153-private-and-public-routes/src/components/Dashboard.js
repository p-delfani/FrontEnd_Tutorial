import React from 'react'
import { isLogin } from './../utils'
import { Navigate } from 'react-router-dom'

export default function Dashboard() {

    let isUserLogin = isLogin('amir')

    console.log(isUserLogin);

    return (
        <div>
            {
                isUserLogin ? (
                    <h1 style={{ textAlign: 'center' }}>WelCome to Dashboard :)</h1>
                ) : (
                    <Navigate to='/login' />
                )
            }
        </div>
    )
}
