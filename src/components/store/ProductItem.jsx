import React, {useState, useEffect, useContext} from 'react'
import {CartContext} from '../../contexts/CartContext';
import {Link} from 'react-router-dom';

function ProductItem({product}) {
    const [count, setCount] = useState();
    const {cartItems} = useContext(CartContext);

    useEffect(() => {
        if(cartItems){
            getCount();
        }
        return () => {
            setCount();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cartItems]);

    async function getCount(){
        console.log(cartItems);
        const match = cartItems.filter(el => el.product_id === product.id)[0];
        if(match){
            setCount(match.count);
        } else {
            setCount(0);
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
                    {count === 0 ? 
                    <button className="button primary">Add to cart</button>
                    :
                    <div className="">
                        {count}
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ProductItem
