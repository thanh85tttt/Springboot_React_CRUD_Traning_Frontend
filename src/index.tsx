import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import store from './store';

/**
 * index.tsx
 * <p>
 * Version 1.0
 * <p>
 * Date: 30-05-2021
 * <p>
 * Copyright By Thanh
 * <p>
 * Modification Logs:
 * DATE             AUTHOR              DESCRIPTION
 * -------------------------------------------------
 * 07-06-2021       ThanhBT11           Create
 */
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
