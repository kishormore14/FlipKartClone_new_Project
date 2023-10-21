import React from 'react';
import { Provider } from 'react-redux';
import Store from './redux/store.js'; // Import your Redux store

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={Store}>
      <App />
    </Provider>
   
  </React.StrictMode>
);
 

reportWebVitals();
