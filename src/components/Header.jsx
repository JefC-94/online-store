import React, {useContext} from 'react'
import {UserContext} from '../contexts/UserContext';
import {Link} from 'react-router-dom';

function Header() {

    const {rootState, logoutUser} = useContext(UserContext);
    const {theUser, isAuth} = rootState;

    return (
        <header>
            <div className="container">
            <p>Online Store</p>

            {isAuth && <div>
                {theUser.username}
                <button className="button primary" id="logoutBtn" onClick={logoutUser}>Logout</button>
            </div>}
            {!isAuth && <Link className="button" to="lobby">Login</Link>}
            </div>
        </header>
    )
}

export default Header