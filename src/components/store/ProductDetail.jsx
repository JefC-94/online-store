import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {CartContext} from '../../contexts/CartContext';
import {axiosObject} from '../../Constants';

function ProductDetail() {

    const {id} = useParams();

    const [product, setProduct] = useState({});
    const [item, setItem] = useState();
    const {orderId, cartItems, addCartItem, minusCartItem, plusCartItem} = useContext(CartContext);

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if(cartItems){
            getItem();
        }
        return () => {
            setItem();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [orderId, product, cartItems]);

    async function getProduct(){
        const request = await axiosObject(`/product/${id}`);
        setProduct(request.data);
    }

    async function getItem(){
        //Instead of checking database, check the items of the users cart to see if the product is in it. This should be faster than checking the entire sel_order_item table
        const match = cartItems.filter(el => el.product_id === product.id)[0];
        if(match){
            setItem(match);
        } else {
            setItem({count: 0});
        }
    }

    return (
        <>
        <Link to="/store">Back to all products</Link>
        {product && 
        <div className="product-list-item" key={product.id} >
            <img src={product.photo_url} alt={product.name} />
            <div className="list-item-info">
                <div className="list-item-content">
                    <p>{product.name}</p>
                    {/* <p className="description">{product.description.substring(0,100)}...</p> */}
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
        }
        </>
    )
}

export default ProductDetail
