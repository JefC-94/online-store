import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {CartContext} from '../../contexts/CartContext';
import {UserContext} from '../../contexts/UserContext';
import {axiosObject} from '../../Constants';
import {imgPath} from '../../Constants';
import {FaTrash, FaCheck} from 'react-icons/fa';

function ProductDetail() {

    const {id} = useParams();

    const {rootState} = useContext(UserContext);
    const {theUser} = rootState;

    const [product, setProduct] = useState({});
    const [item, setItem] = useState();
    const {cart, addCartItem, updateCartItem, createCart, deleteCartItem} = useContext(CartContext);

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
                    <p className="specs">
                        {product.specs}
                    </p>
                    <p className="description">
                        {product.description}
                    </p>
                    <p className={product.in_stock ? "stock in-stock" : "stock not-in-stock"}>
                        {product.in_stock ? "op voorraad" : "tijdelijk niet leverbaar"}
                    </p>
                </div>
                <div className="list-item-extra">
                    <div className="price-wrap">
                        {product.price && <p className="price">
                            <span className="eurosign">€</span>
                            <span>{product.price.slice(0,-3)}</span>
                            <span>{product.price.slice(-2) !== "00" && "," + product.price.slice(-2)}</span>
                        </p>}
                    </div>  
                    {!item && <button className="button primary center addtocart" onClick={() => createCart(product.id)}>Add to cart</button>}
                    {item && item.count === 0 && <button className="button primary center addtocart" onClick={() => addCartItem(product.id)}>Add to cart</button>}
                    {item && item.count > 0 && <div className="count-wrap">
                        <div className="added">
                            <span className="circular-icon"><FaCheck size="16" /></span> 
                            <p>Toegevoegd</p>
                            {/* <FaShoppingCart size="20" /> */}
                        </div>
                        <div className="options">
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
                            <button className="button secondary center" onClick={() => deleteCartItem(item)}><FaTrash size="18" /></button>
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
