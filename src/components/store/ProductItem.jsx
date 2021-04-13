import React, {useState, useEffect, useContext} from 'react'
import {CartContext} from '../../contexts/CartContext';
import {Link} from 'react-router-dom';

function ProductItem({product}) {
    //item is the sel_order_item if there is one
    const [item, setItem] = useState();

    const {cartItems, addCartItem, plusCartItem, minusCartItem} = useContext(CartContext);

    useEffect(() => {
        //cartItems is undefined voor de query naar de db, dus hij zal sowieso enkel checken op array
        //PROBLEEM: cartContext: hij zet op lege array als er nog geen user is
        if(cartItems){
            getItem();
        }
        return () => {
            setItem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    async function getItem(){
        console.log("check");
        console.log(cartItems);
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
