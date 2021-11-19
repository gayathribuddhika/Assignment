import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; 

import Register from "./components/register";

function App() {
  return (
    <div className="App">
      
        <Router path="/register" component={Register}/>
      
    </div>
  );
}

export default App;
