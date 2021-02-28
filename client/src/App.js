import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import User from './views/User';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AuthRoute from './components/AuthRoute';

import AuthState from './context/authState';

function App() {
  return (
    <AuthState>
        <Router>
            <Navbar />
            <Switch>
                <AuthRoute exact path="/" type={'guest'} comp={Login} />
                <AuthRoute exact path="/signup" type={'guest'} comp={Signup} />
                <AuthRoute exact path="/home" type={'private'} comp={Home} />
                <AuthRoute exact path="/user/:username" type={'private'} comp={User} />
            </Switch>
            <Footer/>
        </Router>
    </AuthState>
  );
}

export default App;