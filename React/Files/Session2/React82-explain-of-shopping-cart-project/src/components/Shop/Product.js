import React, { Component } from 'react'

export default class Product extends Component {
    
    render() {
        return (
            <div class="shop-item">
                <span class="shop-item-title">Shirt</span>
                <img class="shop-item-image" src='Images/Shirt.png' />
                <div class="shop-item-details">
                    <span class="shop-item-price">$129</span>
                    <button
                        class="btn btn-primary shop-item-button"
                        type="button">
                        ADD TO CART
                    </button>
                </div>
            </div>
        )
    }
}
