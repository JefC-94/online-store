import React, {useContext} from 'react'
import {UserContext} from '../contexts/UserContext';

import {Link} from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';

function Header() {

    const {rootState, logoutUser} = useContext(UserContext);
    const {theUser, isAuth} = rootState;

    const {cart} = useContext(CartContext);

    return (
        <header>
            <div className="container">
            <Link to="/store">Online Store</Link>

            <div className="navbar">
                <p>{cart && cart.reduce((acc, val) => acc + val.count, 0)}</p>
                <Link to="/checkout">Checkout</Link>
            </div>
            {isAuth && <div>
                {theUser.username}
                <button className="button primary" id="logoutBtn" onClick={logoutUser}>Logout</button>
            </div>}
            {!isAuth && <Link className="button" to="/lobby">Login</Link>}
            </div>            
        </header>
    )
}

export default Header