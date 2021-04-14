import React, {useContext, useEffect} from 'react';
import UserContextProvider from './contexts/UserContext';
import {WindowContext} from './contexts/WindowContext';
import App from './App';

function AppWrapper(){

    const {changeWindowWidth} = useContext(WindowContext);

    const updateDimensions = () => {
        const width = window.innerWidth;
        changeWindowWidth(width);
    }

    useEffect(() => {
        updateDimensions();

        window.addEventListener("resize", updateDimensions);

        return () => {
        window.removeEventListener("resize", updateDimensions);
        }
    })

    return (
        <UserContextProvider>
          <App />
        </UserContextProvider>
    )
  }
export default AppWrapper
