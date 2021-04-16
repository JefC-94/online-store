import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {CartContext} from '../../contexts/CartContext';
import {UserContext} from '../../contexts/UserContext';
import {axiosObject} from '../../Constants';
import {imgPath} from '../../Constants';
import {FaChevronUp, FaChevronDown, FaCheck} from 'react-icons/fa';

function ProductDetail() {

    const {id} = useParams();

    const {rootState} = useContext(UserContext);
    const {theUser} = rootState;

    const [product, setProduct] = useState({});
    const [item, setItem] = useState();
    const {cart, addCartItem, minusCartItem, plusCartItem, createCart} = useContext(CartContext);

    useEffect(() => {
        getProduct();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
    }, [product, cart]);

    async function getProduct(){
        const request = await axiosObject(`/product/${id}`);
        setProduct(request.data);
    }

    async function getItem(){
        //Instead of checking database, check the items of the users cart to see if the product is in it. This should be faster than checking the entire sel_order_item table
        const match = cart.filter(el => el.product_id.id === product.id)[0];
        if(match){
            setItem(match);
        } else {
            setItem({count: 0});
        }
    }

    return (
        <main className="container inner">
        <Link to="/store">Back to all products</Link>
        {product && 
        <div className="product-list-item" key={product.id} >
            <img src={`${imgPath}/${product.photo_url}`} alt={product.name} />
            <div className="list-item-info">
                <div className="list-item-content">
                    <p className="name" >{product.name}</p>
                    <p className="description">{product.description}</p>
                </div>
                <div className="list-item-extra">
                    {!item && <button className="button primary center addtocart" onClick={() => createCart(product.id)}>Add to cart</button>}
                    {item && item.count === 0 && <button className="button primary center addtocart" onClick={() => addCartItem(product.id)}>Add to cart</button>}
                    {item && item.count > 0 && <div className="count-options">
                        <div className="added"><FaCheck size="16" /></div>
                        <p className="count">{item.count}</p>
                        <div className="count-buttons">
                            <button className="arrow arrow-up" onClick={() => plusCartItem(item)}><FaChevronUp /></button>
                            <button className="arrow arrow-down" onClick={() => minusCartItem(item)}><FaChevronDown /></button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
        }
        </main>
    )
}

export default ProductDetail
