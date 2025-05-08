import React from 'react';
import logo from './logo.svg';
import './App.css';

import {Link, Route, Routes} from 'react-router-dom';    // 需要手动下载react-router-dom

import Home from './pages/Home'   // 路由组件
import About from './pages/About'   // 路由组件

import Header from './components/Header'    // 一般组件

function App() {
  return (
    <div>

      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          {/* 一般组件 component */}
          <Header id={"1"}/>
        </div>
      </div>

      <div className="row">
        {/* nav */}
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            
            {/* 原生html中, 靠<a> 跳转不同的页面 */}
            {/* <a className="list-group-item active" href="./about.html">About</a>
            <a className="list-group-item" href="./home.html">Home</a> */}

            {/* step1: 在React中靠路由链接<Link>实现切换组件 ---- 编写路由链接 */}
              <Link className="list-group-item active" to="/about">About</Link>
              <Link className="list-group-item active" to="/home">Home</Link>
          </div>
        </div>

        {/* body content */}
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* step2: 注册路由 --- */}

              <Routes>
                <Route path="/about" element={<About/>}/>
                <Route path="/home" element={<Home/>}/>
              </Routes>
            </div>
          </div>
        </div>
      </div>

  </div>
  );
}

export default App;
