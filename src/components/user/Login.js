import React, {useContext, useState} from 'react'
import {Redirect} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';

function Login({setShowLogin}){

    const {rootState, loginUser,isLoggedIn} = useContext(UserContext);
    const {isAuth} = rootState;

    const initialState = {
        email:'',
        password:'',
    }

    const [userInfo,setUserInfo] = useState(initialState);

    const [error, setError] = useState(false);

    // On change input value (email & password)
    const onChangeValue = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
            }
        );
    }

    // On Submit Login From
    const submitForm = async (event) => {
        event.preventDefault();
        
        if(!userInfo.email){
            setError({
                type: "email",
                message: 'Vul een e-mailadres in'
            });
            return;
        }
        if(!userInfo.password){
            setError({
                type: "password",
                message: "Vul een wachtwoord in"
            });
            return;
        }
        setError(false);
        
        const data = await loginUser(userInfo);
        if(data.success && data.token){
            setUserInfo({...initialState});
            localStorage.setItem('loginToken', data.token);
            await isLoggedIn();
        }
        else{
            setError({
                type: JSON.parse(data.message).type,
                message: JSON.parse(data.message).message
            });
        }
    }

    if(!isAuth){

        return(
            <div className="lobby-panel-left panel-login">
                <h1 className="lobby">Inloggen</h1>
                <form  id="login-form" onSubmit={submitForm} noValidate>
                    <div className="form-control">
                        <label htmlFor="email" >E-mail</label>
                        <input name="email" type="email" required placeholder="E-mail" value={userInfo.email} onChange={onChangeValue} />
                        {error.type === "email" && 
                            <p className="error">{error.message}</p>
                        }
                    </div>
                
                    <div className="form-control">
                        <label htmlFor="password" >Wachtwoord</label>
                        <input name="password" type="password" required placeholder="Wachtwoord" value={userInfo.password} onChange={onChangeValue} autoComplete="on" />
                        {error.type === "password" && 
                            <p className="error">{error.message}</p>
                        }
                    </div>

                    <div className="form-control">
                        <button className="button primary fullwidth mg-t" type="submit">Inloggen</button>
                    </div>
                </form>
                <div className="below-form">
                    <span>Nog geen account?</span>
                    <button
                        className='lobbySwitchBtn link' 
                        onClick={() => setShowLogin(prevVal => !prevVal)}
                    >Registreer</button> 
                </div>
            </div>
        );
    
    } else {
        return <Redirect to={'/'} />
    }
}

export default Login;