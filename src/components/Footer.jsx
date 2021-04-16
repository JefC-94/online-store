import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <p>Project van Jef Ceuppens</p>
            <span>&nbsp;|&nbsp;</span><Link className="link" to='/about'>Meer info</Link>
        </footer>
    )
}

export default Footer
