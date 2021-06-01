import React, { useEffect } from 'react';
import { auth } from '../firebase';
import useStore from '../store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import './app.css';

import Dashboard from './Dashboard';
import Register from './Auth/Register';
import Login from './Auth/Login';
import ForgotPassword from './Auth/ForgotPassword';
import UpdateProfile from './Auth/UpdateProfile';

function App() {
  const setCurrentUser = useStore(state => state.setCurrentUser);

  // run this on mount just once
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authedUser => {
      if (authedUser) {
        setCurrentUser(authedUser);
      } else {
        setCurrentUser(null);
      }
    });
    return unsubscribe; // this unsubscribes from stream listener
  }, []);

  return (
    <div className="main-container">
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
