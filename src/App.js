import './scss/style.scss';
import React, {useContext, useEffect} from 'react';
import UserContextProvider from './contexts/UserContext';
import WindowContextProvider from './contexts/WindowContext';
import CartContextProvider from './contexts/CartContext';
import Home from './components/Home';
import {WindowContext} from './contexts/WindowContext';
import {BrowserRouter} from 'react-router-dom';

function App() {
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
    <BrowserRouter>
      <CartContextProvider>
          <Home />
      </CartContextProvider>
    </BrowserRouter>
  );
}

function AppWrapper(){
  return (
    <WindowContextProvider>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </WindowContextProvider>
  )
}

export default AppWrapper;
