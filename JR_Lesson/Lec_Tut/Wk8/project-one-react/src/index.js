
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';               // !! 指向同路径下的App.js !!
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));    // 之后react写成的网页元素都会塞到这个html元素里
// what we are going to render
root.render(
  <React.StrictMode>
    <App />     
  </React.StrictMode>
);  // !! <App /> return a piece of html code!!

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
