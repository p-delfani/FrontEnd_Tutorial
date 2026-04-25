import React, { useState } from 'react'

export default function CartProduct(props) {

    const clickHandler = (id) => {
        props.onRemove(id)
    }

    // let { id, title, price, img } = this.props

    return (
        <div class="cart-row">
            <div class="cart-item cart-column">
                <img class="cart-item-image" src={props.img} width="100" height="100" />
                <span class="cart-item-title">{props.title}</span>
            </div>
            <span class="cart-price cart-column">${props.price}</span>
            <div class="cart-quantity cart-column">

                <button class="btn btn-danger" type="button" onClick={() => clickHandler(props.id)}>REMOVE</button>
            </div>
        </div>
    )
}
