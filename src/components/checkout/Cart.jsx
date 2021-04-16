import React, {useState, useEffect, useContext} from 'react'
import { CartContext } from '../../contexts/CartContext';
import {imgPath} from '../../Constants';
import {Link} from 'react-router-dom';
import {BiChevronLeft} from 'react-icons/bi';
import {FaTrash} from 'react-icons/fa';

function Cart() {

    const {cart, updateCartItem, deleteCartItem, confirmOrder} = useContext(CartContext);

    const [amounts, setAmounts] = useState({
        cartTotal: 0,
        btw: 0,
    });

    const [finalTotal, setFinalTotal] = useState(0);

    useEffect(() => {
        setFinalTotal((+amounts.cartTotal + +amounts.btw).toFixed(2));
    }, [amounts]);

    useEffect(() => {
        if(cart){
            setAmounts(prevVal => ({...prevVal, 
                cartTotal: (cart.reduce((acc, val) => acc + val.product_id.price * val.count, 0).toFixed(2)),
                btw: (cart.reduce((acc, val) => acc + val.product_id.price * val.count, 0) * .21).toFixed(2) 
                })
            );
        }
    }, [cart]);

    return (
        <main className="container inner cart-main">
            <div className="cart-nav">
                <Link className="button secondary center" to="/store"><BiChevronLeft size="22" /> Winkel verder</Link>
                <h1>Winkelwagentje</h1>
            </div>
            {(!cart || cart.length === 0 ) && <div className="center-message"><p style={{marginBottom:'1em'}}>Je hebt nog niets aan je winkelkarretje toegevoegd.</p><Link className="button primary center" to="/store">Start met winkelen!</Link></div>}
            {(cart && cart.length > 0 ) && <div className="cart-wrap">
                <div className="cart-list">
                    {cart.length > 0 && cart.map(item => {
                        return (
                        <div className="cart-item" key={item.id}>
                            <div className="cart-item-info">
                                <div className="cart-item-image">
                                    <img src={`${imgPath}/${item.product_id.photo_url}`} alt={item.product_id.name} />
                                </div>
                                <div className="cart-item-content">
                                    <Link className="name" to={`/product/${item.product_id.id}`}>{item.product_id.name}</Link>
                                    <p>{item.product_id.price}</p>
                                </div>
                            </div>
                            <div className="cart-item-extra">
                                <div className="count-options">
                                    <label>Aantal</label>
                                    <select value={item.count} onChange={(e) => {updateCartItem(item, e.target.value)}}>
                                        <option value={1}>1</option>
                                        <option value={2}>2</option>
                                        <option value={3}>3</option>
                                        <option value={4}>4</option>
                                        <option value={5}>5</option>
                                        <option value={6}>6</option>
                                        <option value={7}>7</option>
                                        <option value={8}>8</option>
                                        <option value={9}>9</option>
                                        <option value={10}>10</option>
                                    </select>
                                </div>
                                <p className="items-price" >€ {item.product_id.price * item.count}</p>
                                <button className="button secondary center" onClick={() => deleteCartItem(item)}><FaTrash /></button>
                            </div>
                        </div>
                        )
                    })
                    }
                    </div>
            </div>}
            {(cart && cart.length > 0) && <div className="checkout-wrap">
                <div className="checkout-left">
                    Promo's enzo
                </div>
                <div className="checkout-right">
                <table>
                    <tbody>
                    <tr>
                        <td>Totaal artikelen</td>
                        <td>
                            {amounts.cartTotal}
                        </td>
                    </tr>
                    <tr>
                        <td>BTW</td>
                        <td>
                            {amounts.btw}
                        </td>
                    </tr>
                    <tr className="finalTotal">
                        <td>Totaal</td>
                        <td>
                            {finalTotal}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <div className="confirm-order">
                    <button className="button primary center" onClick={() => confirmOrder()}>Bevestig bestelling</button>
                </div>
                </div>
            </div>}

        </main>
    )
}

export default Cart
