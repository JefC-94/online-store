import React, {useContext,useState} from 'react';
import Login from './user/Login';
import Register from './user/Register';
import {UserContext} from './../contexts/UserContext';

function Lobby() {
    
    const [showLogin, setShowLogin] = useState(true);
    
    const demoUser = {
        email:'steve@hotmail.com',
        password:'azertyui',
    }

    const {loginUser, isLoggedIn} = useContext(UserContext);

    const demoLogin = async () => {
        const data = await loginUser(demoUser);
        if(data.success && data.token){
            localStorage.setItem('loginToken', data.token);
            await isLoggedIn();
        }
    }


    return (
        <main className="container main-lobby">
        <div className='lobby-container'>
            <div className='lobby-panel'>
                    {showLogin && <Login setShowLogin={setShowLogin} />}
                    {!showLogin && <Register setShowLogin={setShowLogin} />}
            </div>
            <div className="demo-wrap">
                <p>It's also possible to login with one of the demo accounts</p>
                <button className="button primary fullwidth" onClick={() => demoLogin()}>
                    View demo
                </button>
            </div>
        </div>
        </main>
    )
}

export default Lobby