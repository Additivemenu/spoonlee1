import logo from './logo.svg';
import './App.css';

// 底部的页码
import React from 'react';
import Posts from './components/Posts'
import Pagination from './components/Pagination'

const App = () =>{
    return (
      <div>
        <h1>My Blog</h1>
        <Posts/>
      </div>


    )
}



export default App;
