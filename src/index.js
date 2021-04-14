import React from 'react';
import ReactDOM from 'react-dom';
import AppWrapper from './AppWrapper';
import {Provider} from "react-redux";
import {createStore} from "redux";
import reducers from "./store/reducer";
import WindowContextProvider from './contexts/WindowContext';
const store = createStore(reducers);


ReactDOM.render(<Provider store={store}>
  <WindowContextProvider>
      <React.StrictMode>
        <AppWrapper />
      </React.StrictMode>
    </WindowContextProvider>  
   </Provider>,
   document.getElementById('root')
);

