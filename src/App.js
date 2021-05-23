import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { db } from "./firebase";
import notesStore from "./store";
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './PrivateRoute';

import styled from 'styled-components';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {

  const { setNotes } = notesStore();
  
  useEffect(() => {
    db.collection('notes')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snapshot => {
        setNotes(snapshot.docs.map(doc => {
          return {
            id: doc.id, 
            content: doc.data().content,
            timestamp: doc.data().timestamp,
            state: doc.data().active
          }
        }))
      })
  }, []);

  return (
    <Container>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </Container>
  );
}

export default App;

const Container = styled.main`
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
`