import React, { Component } from 'react'

export default class CartProduct extends Component {

    render() {

        return (
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src="Images/Shirt.png" width="100" height="100" />
                    <span class="cart-item-title">Shirt</span>
                </div>
                <span class="cart-price cart-column">$198</span>
                <div class="cart-quantity cart-column">

                    <button class="btn btn-danger" type="button">REMOVE</button>
                </div>
            </div>
        )
    }
}
