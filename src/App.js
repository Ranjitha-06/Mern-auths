import React from 'react';
import NavBar from './components/NavBar';
import "./App.css";
import {BrowserRouter,Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import SignUp from './components/Signup';

function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Route exact path='/'><Login/></Route>
      <Route exact path='/home'><Home /></Route>
      <Route path='/SignUp'><SignUp/></Route>
    </BrowserRouter>
    
  );
}

export default App;
