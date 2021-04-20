import React, {useState, useEffect, useContext} from 'react'
import {CartContext} from '../../contexts/CartContext';
import {Link} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import {WindowContext} from '../../contexts/WindowContext';
import {imgPath} from '../../Constants';
import {FaTrash, FaCheck, FaShoppingCart} from 'react-icons/fa';

function ProductItem({product}) {
    //item is the sel_order_item if there is one
    const [item, setItem] = useState();

    const {rootState} = useContext(UserContext);
    const {theUser} = rootState;

    const {windowWidth} = useContext(WindowContext);

    const {cart, addCartItem, createCart, deleteCartItem} = useContext(CartContext);

    useEffect(() => {
        //Three options:
        /**
         * No user, no cart -> set "add to cart" buttons as links to login page
         * User, but no cart -> set all items with count = 0
         * User, at least one cartItem -> set all items individually in function
         */
        if(!cart && !theUser){
            setItem();
            return;
        }
        if(!cart){
            setItem({count: 0});
            return;
        }
        if(cart){
            getItem();
        }
        return () => {
            setItem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cart]);

    async function getItem(){
        //Instead of checking database, check the items of this cart to see if the product is in it. This should be faster than checking the entire sel_order_item table
        const match = cart.filter(el => el.product_id.id === product.id)[0];
        if(match){
            setItem(match);
        } else {
            setItem({count: 0});
        }
    }

    return (
        <div className="product-list-item" key={product.id} >
            {windowWidth < 520 && <Link className="product-name" to={`/product/${product.id}`}>{product.name}</Link>}
            <div className="list-item-img">
                <img src={`${imgPath}/${product.photo_url}`} alt={product.name} />
            </div>
            <div className="list-item-info">
                <div className="list-item-content">
                    {windowWidth > 520 && <Link className="product-name" to={`/product/${product.id}`}>{product.name}</Link>}
                    <p className="product-specs">
                        {product.specs}
                    </p>
                    <p className="product-description">
                        {product.description.split(' ').slice(0,15).join(' ')}...
                    </p>
                    <p className={product.in_stock ? "product-stock in-stock" : "product-stock not-in-stock"}>
                        {product.in_stock ? "op voorraad" : "tijdelijk niet leverbaar"}
                    </p>
                </div>
                <div className="list-item-extra">
                    <div className="product-price">
                        <span className="eurosign">€</span>
                        <span>{product.price.slice(0,-3)}</span>
                        <span>{product.price.slice(-2) !== "00" && "," + product.price.slice(-2)}</span>
                    </div>
                    <div className="cart-wrap">
                        {!item && <button className="button primary center padded" onClick={() => createCart(product.id)}>Voeg toe &nbsp;<FaShoppingCart size="20" /></button>}
                        {item && item.count === 0 && <button className="button primary center padded" onClick={() => addCartItem(product.id)}>Voeg toe &nbsp;<FaShoppingCart size="20" /></button>}
                        {item && item.count > 0 && 
                        <div className="item-added">
                            <div className="cart-check">
                            <span className="circular-icon"><FaCheck size="16" /></span> 
                            <p>In winkelwagen</p>
                            </div>
                            <button className="button secondary center" onClick={() => deleteCartItem(item)}><FaTrash size="18" /></button>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductItem
