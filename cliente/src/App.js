import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './components/views/Login';
import Signup from './components/views/Signup';
import Home from './components/views/Home';
import User from './components/views/User';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/user/:username" component={User} />
        </Switch>
        <Footer/>
    </Router>
  );
}

export default App;