import React from 'react';
import {NavLink} from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <p>Project van Jef Ceuppens</p>
            <span>&nbsp;|&nbsp;</span><NavLink activeClassName="link active" className="link" to='/about'>Meer info</NavLink>
        </footer>
    )
}

export default Footer
