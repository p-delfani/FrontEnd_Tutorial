import React, { Component, Fragment } from 'react'
import { FiUsers } from 'react-icons/fi'
import { GiAbstract048 } from 'react-icons/gi'
import { BsFillCloudArrowDownFill } from 'react-icons/bs'

export default class Users extends Component {
    render() {
        return (
            <>
                <li><FiUsers /> Amin</li>
                <li><GiAbstract048 /> Mohammad</li>
                <li><BsFillCloudArrowDownFill /> Babak</li>
            </>
        )
    }
}
