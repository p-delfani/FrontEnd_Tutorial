import React, { Component } from 'react'

export default class Product extends Component {

    clickHandler (id) {
        this.props.onAddProduct(id)
    }
    
    render() {

        let {id, title, price, img} = this.props

        return (
            <div class="shop-item">
                <span class="shop-item-title">{title}</span>
                <img class="shop-item-image" src={img} />
                <div class="shop-item-details">
                    <span class="shop-item-price">${price}</span>
                    <button
                        class="btn btn-primary shop-item-button"
                        type="button"
                        onClick={this.clickHandler.bind(this, id)}>
                        ADD TO CART
                    </button>
                </div>
            </div>
        )
    }
}
