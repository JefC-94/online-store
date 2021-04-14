import React, {useState, useEffect, useContext} from 'react'
import {CartContext} from '../../contexts/CartContext';
import {Link} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';

function ProductItem({product}) {
    //item is the sel_order_item if there is one
    const [item, setItem] = useState();

    const {rootState} = useContext(UserContext);
    const {theUser} = rootState;

    const {cartItems, addCartItem, plusCartItem, minusCartItem} = useContext(CartContext);

    useEffect(() => {
        //Three options:
        /**
         * No user, no cartItems -> set "add to cart" buttons as links to login page
         * User, but no cartItems -> set all items with count = 0
         * User, at least one cartItem -> set all items individually in function
         */
        if(!cartItems && !theUser){
            setItem();
            return;
        }
        if(!cartItems){
            setItem({count: 0});
            return;
        }
        if(cartItems){
            getItem();
        }
        return () => {
            setItem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    async function getItem(){
        //Instead of checking database, check the items of this cart to see if the product is in it. This should be faster than checking the entire sel_order_item table
        const match = cartItems.filter(el => el.product_id === product.id)[0];
        if(match){
            setItem(match);
        } else {
            setItem({count: 0});
        }
    }

    return (
        <div className="product-list-item" key={product.id} >
            <img src={product.photo_url} alt={product.name} />
            <div className="list-item-info">
                <div className="list-item-content">
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                    <p className="description">{product.description.substring(0,100)}...</p>
                </div>
                <div className="list-item-extra">
                    {!item && <Link className="button primary" to="lobby">Add to cart</Link>}
                    {item && item.count === 0 && <button className="button primary" onClick={() => addCartItem(product.id)}>Add to cart</button>}
                    {item && item.count > 0 && <div className="">
                        <button onClick={() => minusCartItem(item)}>-</button>
                        {item.count}
                        <button onClick={() => plusCartItem(item)}>+</button>
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default ProductItem