import React, {useState, useEffect, useContext} from 'react';
import {useParams, Link} from 'react-router-dom';
import {CartContext} from '../../contexts/CartContext';
import {UserContext} from '../../contexts/UserContext';
import {axiosObject} from '../../Constants';
import {imgPath} from '../../Constants';
import {FaTrash, FaCheck, FaShoppingCart} from 'react-icons/fa';
import {BiChevronLeft} from 'react-icons/bi';

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
        const request = await axiosObject(`/product/${id}?join=prod_spec,spec`);
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
        <div className="back-to-store">
            <Link className="button secondary center" to="/"><BiChevronLeft size="22" />Back to all products</Link>
        </div>
        <div className="product-detail-wrap">
            <div className="product-detail-heading">
                <h1 className="product-name" >{product.name}</h1>
            </div>
            {product && 
            <>
            <div className="product-detail-basic" key={product.id} >
                <div className="product-image">
                    <img src={`${imgPath}/${product.photo_url}`} alt={product.name} />
                </div>
                <div className="product-detail-extra">
                    <div className="top-info">
                        {product.price && <div className="product-price">
                        <span className="eurosign">€</span>
                        <span>{product.price.slice(0,-3)}</span>
                        <span>{product.price.slice(-2) !== "00" && "," + product.price.slice(-2)}</span>
                    </div>}
                    <div className="rating">
                        <p className="product-rating">Rating: {product.rating && product.rating.slice(0,-1)} / 5</p>
                    </div>
                    <div className="delivery">
                        <p className={product.in_stock ? "product-stock in-stock" : "product-stock not-in-stock"}>
                        {product.in_stock ? "op voorraad" : "tijdelijk niet leverbaar"}
                        </p>
                        <p className="delivery-info">
                        {product.in_stock && "De bezorgtijd voor dit product is 1 - 2 dagen."}
                        {!product.in_stock && `Binnen ${product.in_stock_weeks} ${product.in_stock_weeks === 1 ? "week" : "weken"} terug in voorraad`}
                        </p>
                    </div>               
                    <div className="service-checklist">
                        <p className=""><FaCheck size="14" /><span>gratis verzending</span></p>
                        <p className=""><FaCheck size="14" /><span>30 dagen retourgarantie</span></p>
                    </div>
                    </div> 
                    <div className="cart-wrap">
                        {!item && <button className="button primary center addtocart" onClick={() => createCart(product.id)}>Voeg toe<FaShoppingCart className="mg-l" size="20" /></button>}
                        {item && item.count === 0 && <button className="button primary center addtocart" onClick={() => addCartItem(product.id)}>Voeg toe<FaShoppingCart className="mg-l" size="20" /></button>}
                        {item && item.count > 0 && 
                        <>
                        <div className="item-added">
                                <div className="cart-check">
                                <span className="circular-icon"><FaCheck size="16" /></span> 
                                <p>In winkelwagen</p>
                                </div>
                                <button className="button secondary center" onClick={() => deleteCartItem(item)}><FaTrash className="mg-r" size="18" />Verwijder</button>
                        </div>
                        <div className="item-count">
                            <span>Aantal</span>
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
                        </>}
                    </div>
                </div>
            </div>
            <div className="product-detail-content">
                <p className="description">
                    {product.description}
                </p>
                <div className="specs">
                    <h2>Technische specificaties</h2>
                    <table>
                    <tbody>
                    {product.prod_spec && product.prod_spec.map(spec => {
                        return (
                        <tr key={spec.id}>
                        <td>{spec.type_id.type}</td><td>{spec.value}</td>
                        </tr>
                        )
                    })}
                    </tbody>
                    </table>
                </div>
            </div>
        </>
        }
        </div>
        </main>
    )
}

export default ProductDetail
