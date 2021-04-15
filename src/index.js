import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './AppWrapper';
import WindowContextProvider from './contexts/WindowContext';

ReactDOM.render(
    <WindowContextProvider>
      <React.StrictMode>
        <AppWrapper />
      </React.StrictMode>
    </WindowContextProvider>,
   document.getElementById('root')
);

