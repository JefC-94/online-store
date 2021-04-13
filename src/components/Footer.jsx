import React from 'react';
import {Link} from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <p>© Jef Ceuppens</p>
            <span>&nbsp;|&nbsp;</span><Link className="link" to='about'>About this project</Link>
        </footer>
    )
}

export default Footer
