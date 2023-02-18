import React from 'react';
import logo from './logo.svg';
import './App.css';

import Button from '@mui/material/Button';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button 
          startIcon={<AccessAlarmIcon/>}
          size ='small'
          onClick={()=>alert('hello')} 
          href="#" 
          variant='contained' 
          color='primary'
          style={{fontSize:18}}
          >Hello World!
        </Button>

        <img src={logo} className="App-logo" alt="logo" />
      </header>
    </div>
  );
}

export default App;
