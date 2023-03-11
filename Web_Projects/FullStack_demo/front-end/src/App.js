import logo from './logo.svg';
import React, { useRef, useState } from "react";
import './App.css';

import apiClient from "./http-common";

function App() {
  // hooks and states =====================================================================
  const post_name = useRef(null);
  const post_email = useRef(null);
  const post_password = useRef(null);

  const [postResult, setPostResult] = useState(null);		// 表示post response 的state
	
  // functions =================================================================
  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };
	
  // API1: async + await 的经典写法 -------------------------------------------------
  async function postData() {
    // ! which is the post body
    const postData = {
      name: post_name.current.value,
      email: post_email.current.value,
      password: post_password.current.value
    };

    try {
      // res 为 post request的response
      // 在这里正式发送HTTP request
      const res = await apiClient.post("/users/signup", postData, {
        headers: {
          "x-access-token": "token-value",
        },
      });

      // format conversion
      const result = {
        status: res.status + "-" + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setPostResult(fortmatResponse(result));   // stringfy result obj
      
    } catch (err) {
      setPostResult(fortmatResponse(err.response?.data || err));
    }
  }
	
  // ----------------------------------------------------------
  const clearPostOutput = () => {
    setPostResult(null);
  };
	
  // jsx =================================================================
  return (
    <div id="app" className="container">
      <div className="card">
        <div className="card-header">React Axios POST - BezKoder.com</div>
        
        <div className="card-body">
          <div className="form-group">
            <input type="text" className="form-control" ref={post_name} placeholder="Title" />
          </div>
          
          <div className="form-group">
            <input type="text" className="form-control" ref={post_email} placeholder="Description" />
          </div>

          <div className="form-group">
            <input type="text" className="form-control" ref={post_password} placeholder="published" />
          </div>

          {/*真正的发送API的功能*/}
          <button className="btn btn-sm btn-primary" onClick={postData}>Post Data</button>
          <button className="btn btn-sm btn-warning ml-2" onClick={clearPostOutput}>Clear</button>

          {/* response info */}
          { postResult && 
            <div className="alert alert-secondary mt-2" role="alert">
             		<pre>{postResult}</pre>
            </div> }
        </div>
      </div>
    </div>
  );
}

export default App;
