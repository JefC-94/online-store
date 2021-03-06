import React, {useContext,useState} from 'react';
import Login from './user/Login';
import Register from './user/Register';
import {UserContext} from './../contexts/UserContext';

function Lobby() {
    
    const [showLogin, setShowLogin] = useState(true);
    
    const demoUser = {
        email:'john@hotmail.com',
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
        <main className="container inner main-lobby">
        <div className='lobby-container'>
            {/* <div className='lobby-panel-left'> */}
                    {showLogin && <Login setShowLogin={setShowLogin} />}
                    {!showLogin && <Register setShowLogin={setShowLogin} />}
            {/* </div> */}
            <div className="lobby-panel-right">
                <p>Log in met een van de demo accounts</p>
                <button className="button primary padded" onClick={() => demoLogin()}>
                    Demo
                </button>
            </div>
        </div>
        </main>
    )
}

export default Lobby