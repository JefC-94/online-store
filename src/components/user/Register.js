import React, {useContext,useState} from 'react';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../../contexts/UserContext';
import {axiosObject} from '../../Constants';

function Register({setShowLogin}){
    
    const {rootState, registerUser, loginUser, isLoggedIn} = useContext(UserContext);

    const {isAuth} = rootState;

    const initialState = {
        username:'',
        email:'',
        password:''
    }

    const [userInfo,setUserInfo] = useState(initialState);

    const [error, setError] = useState(false); // Error has type and message properties for placement

    // On Submit the Registration Form
    const submitForm = async (event) => {
        event.preventDefault();
        if(!userInfo.username){
            setError({
                type: "username",
                message:'Vul een gebruikersnaam in'
            });
            return;
        }
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
        const data = await registerUser(userInfo);
        if(data.success){
            //setUserInfo({...initialState});
            console.log(data);
            const timestamp = Math.floor(new Date().getTime() / 1000 );
            const request1 = await axiosObject.post(`/cart`, {
                user_id: +data.success,
                created_at: timestamp
            });
            console.log(request1.status);
            const login = await loginUser(userInfo);
            if(login.success && login.token){
                //setUserInfo({...initialState});
                localStorage.setItem('loginToken', login.token);
                await isLoggedIn();
            }
            
        }
        else{
            setError({
                type: JSON.parse(data.message).type,
                message: JSON.parse(data.message).message
            });
            console.log(data);
        }
    }

    // On change the Input Value (name, email, password)
    const onChangeValue = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]:e.target.value
            }
        );
    }
    
    if(!isAuth){
        return(
            <div className="lobby-panel-left panel-register">
                <h1 className="lobby">Registreren</h1>
                
                <form id="register-form" onSubmit={submitForm} noValidate>
                    
                    <div className="form-control">
                        <label htmlFor="username">Gebruikersnaam</label>
                        <input className="form-input" name="username" required type="text" value={userInfo.username} onChange={onChangeValue} placeholder="Gebruikersnaam"/>
                        {error.type === "username" && 
                            <p className="error">{error.message}</p>
                        }
                    </div>
                    
                    <div className="form-control">
                        <label htmlFor="email">E-mail</label>
                        <input className="form-input" name="email" required type="email" value={userInfo.email} onChange={onChangeValue} placeholder="E-mail"/>
                        {error.type === "email" && 
                            <p className="error">{error.message}</p>
                        }
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Wachtwoord</label>
                        <input className="form-input" name="password" required type="password" value={userInfo.password} onChange={onChangeValue} placeholder="Wachtwoord" />
                        {error.type === "password" && 
                            <p className="error">{error.message}</p>
                        }
                    </div>

                    <div className="form-control">
                        <button className="button primary fullwidth" type="submit">Registreren</button>
                    </div>
                </form>

                <div className="below-form">
                    <span>Niet jouw eerste bezoek?</span>
                    <button 
                        className='lobbySwitchBtn link' 
                        onClick={() => setShowLogin(prevVal => !prevVal)}
                    >Login</button>
                </div>
                
            </div>
        );
    } else {
        return <Redirect to='/' />
    }
}

export default Register
