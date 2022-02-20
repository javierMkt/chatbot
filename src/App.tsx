import React, { useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import './App.css'
import PrivateRoute from './components/PrivateRoute'
import Home from './containers/Home/home.js'
import Login from './containers/Login/login.js'
import Register from './containers/Register/register.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <PrivateRoute path="/" exact component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/singup" component={Register} />
      </BrowserRouter>
    </div>
  );
}

export default App;