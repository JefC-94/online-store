import './scss/style.scss';
import React, {useContext, useEffect} from 'react';
import UserContextProvider from './contexts/UserContext';
import ProductContextProvider from './contexts/ProductContext';
import {WindowContext} from './contexts/WindowContext';
import CartContextProvider from './contexts/CartContext';
import Home from './components/Home';

function App(){
  
    return (
      <CartContextProvider>
        <Home />
      </CartContextProvider>
    );

}

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
        <ProductContextProvider>
          <App />
        </ProductContextProvider>
      </UserContextProvider>
    )
}

export default AppWrapper