import React, { Component } from 'react'

export default class CartProduct extends Component {

    clickHandler (id) {
        this.props.onRemove(id)
    }

    render() {

        let {id, title, price, img} = this.props

        return (
            <div class="cart-row">
                <div class="cart-item cart-column">
                    <img class="cart-item-image" src={img} width="100" height="100" />
                    <span class="cart-item-title">{title}</span>
                </div>
                <span class="cart-price cart-column">${price}</span>
                <div class="cart-quantity cart-column">

                    <button class="btn btn-danger" type="button" onClick={this.clickHandler.bind(this, id)}>REMOVE</button>
                </div>
            </div>
        )
    }
}
