import React, {useContext, useEffect} from 'react'
import { CartContext } from '../../contexts/CartContext';
import {Link} from 'react-router-dom';

function Cart() {

    const {cartItems, addCartItem, minusCartItem, plusCartItem} = useContext(CartContext);

    return (
        <div className="cart-container">
            
            {cartItems.map(item => {
                return (
                <div className="cart-item" key={item.id}>
                    <p>{item.product_id.name}</p>
                    <p>{item.product_id.description}</p>
                    <p>{item.product_id.price}</p>
                    <div className="list-item-extra">
                        <div className="">
                            <button onClick={() => minusCartItem(item)}>-</button>
                            {item.count}
                            <button onClick={() => plusCartItem(item)}>+</button>
                        </div>
                        <p>{item.product_id.price * item.count}</p>
                    </div>
                </div>
                )
            })
            }

            <div className="total-price">
                {cartItems.reduce((acc, val) => acc + val.product_id.price * val.count, 0)}
            </div>
        </div>
    )
}

export default Cart
