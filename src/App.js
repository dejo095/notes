import React, { useEffect } from 'react';
import { auth } from './firebase';
import useStore from './store';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';

import styled from 'styled-components';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {

  const setCurrentUser = useStore(state => state.setCurrentUser);

   // run this on mount just once
   useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authedUser => {
        setCurrentUser(authedUser);
    })

    return unsubscribe; // this unsubscribes from stream listener
  }, []);


  return (
    <Container>
      <Router>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/update-profile" component={UpdateProfile} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/forgot-password" component={ForgotPassword} />
        </Switch>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.main`
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
`