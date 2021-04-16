import React, {useContext} from 'react'
import {UserContext} from '../contexts/UserContext';

import {Link} from 'react-router-dom';
import { CartContext } from '../contexts/CartContext';
import {ReactComponent as StoreLogo} from '../images/store-logo.svg';

import {FaShoppingCart, FaUser} from 'react-icons/fa';

function Header() {

    const {rootState, logoutUser} = useContext(UserContext);
    const {theUser, isAuth} = rootState;

    const {cart} = useContext(CartContext);

    return (
        <header>
            <div className="container">
            <div className="header-left">
                <Link className="white" to="/store">
                    <StoreLogo />
                </Link>
            </div>

            <div className="header-right">
                <div className="cart">
                    <p className="count">{cart && cart.length}</p>
                    <Link className="white center" to="/cart"><FaShoppingCart size="20" /></Link>
                </div>
                {isAuth && <div className="user-info">
                    <div className="username">
                        <p className="username">{theUser.username}</p>
                        <FaUser size="18" />
                    </div>
                    <button className="white" id="logoutBtn" onClick={logoutUser}>Log uit</button>
                </div>}
                {!isAuth && <Link className="white" to="/lobby">Login</Link>}
                </div>   
            </div>    
        </header>
    )
}

export default Header