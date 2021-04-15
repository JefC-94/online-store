import './scss/style.scss';
import React from 'react';
import CartContextProvider from './contexts/CartContext';
import Home from './components/Home';

function App(){
  
    return (
      <CartContextProvider>
        <Home />
      </CartContextProvider>
    );

}

export default App;
