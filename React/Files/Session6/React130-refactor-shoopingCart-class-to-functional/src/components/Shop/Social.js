import React, { Component } from 'react'

export default function Social (props) {

        // let {href, img} = this.props

        return (
            <li>
                <a href={props.href} target="_blank">
                    <img src={props.img} />
                </a>
            </li>
        )
    }