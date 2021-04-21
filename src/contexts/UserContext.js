import React, {useState, useEffect, createContext} from "react";
import axios from 'axios';

export const UserContext = createContext();

const url = process.env.NODE_ENV === 'development' ? 'http://localhost:8080/online-store/server' : 'http://www.fantastic-store.be/server';

const Axios = axios.create({
    baseURL: url,
});

function UserContextProvider(props) {
    const [rootState, setRootState] = useState({isAuth:false,theUser:null})

    useEffect(() => {
        isLoggedIn();
    }, []);

    const logoutUser = () => {
        localStorage.removeItem('loginToken');
        setRootState(prevValue => ({theUser:null, isAuth:false}));
        isLoggedIn();
    }

    const registerUser = async (user) => {
        const register = await Axios.post('/register.php', {
            username: user.username,
            email: user.email,
            password: user.password
        });
        
        return register.data;
    }

    const loginUser = async (user) => {
        const login = await Axios.post('/login.php', {
            email: user.email,
            password: user.password
        });
        console.log(login.data);
        return login.data;
    }

    const editUser = async (user) => {
        const edit = await Axios.put('/edit.php', {
            id: user.id,
            username: user.username,
            oldPassword: user.oldPassword,
            newPassword: user.newPassword
        });
        return edit.data;
    }

    const isLoggedIn = async () => {
        const loginToken = localStorage.getItem('loginToken');

        if(loginToken){

            //Adding JWT token to axios default header
            Axios.defaults.headers.common['X-Authorization'] = 'bearer ' + loginToken;

            const {data} = await Axios.get('/user-info.php');

            if(data.success && data.user){
                setRootState(prevValue => ({...prevValue, isAuth:true,theUser:data.user}));
            }
        }
    }

    return (
        <UserContext.Provider value={{
            rootState,
            isLoggedIn,
            registerUser,
            loginUser,
            logoutUser,
            editUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserContextProvider;
