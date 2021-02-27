import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Login from './views/Login';
import Signup from './views/Signup';
import Home from './views/Home';
import User from './views/User';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
        <Navbar />
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/" component={Signup} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/user/:username" component={User} />
        </Switch>
        <Footer/>
    </Router>
  );
}

export default App;