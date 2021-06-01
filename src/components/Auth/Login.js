import React, { useState } from 'react';
import { auth, provider } from '../../firebase';
import firebase from 'firebase/app';
import { Link, useHistory } from 'react-router-dom';
import './login.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';

function Login() {
  const [user, setUser] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  const handleGoogleSubmit = async e => {
    e.preventDefault();
    try {
      setError('');
      setIsLoading(true);
      provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
      const result = await firebase.auth().signInWithPopup(provider);
      if (result) {
        const credential = result.credential;
        const token = credential.accessToken;
        console.log('token ', token);
        const user = result.user;
        console.log('user ', user);
      }
      history.push('/');
    } catch (error) {
      console.log(error);
      setError('Failed login! issues with Google provider');
    }
    setIsLoading(false);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setError('');
      setIsLoading(true);
      await auth.signInWithEmailAndPassword(user.email, user.password);
      history.push('/');
    } catch {
      setError('Failed login! Invalid credentials / no user');
    }
    setIsLoading(false);
  };

  return (
    <div className="login">
      <h1>Login</h1>

      {error && <Alert severity="error">{error}</Alert>}

      <form className="form" autoComplete="off">
        <TextField
          onChange={e => setUser({ ...user, email: e.target.value })}
          type="email"
          label="Email"
        />
        <TextField
          onChange={e => setUser({ ...user, password: e.target.value })}
          type="password"
          label="Password"
        />
        <Box width="80%" display="flex" flexDirection="row" justifyContent="space-between">
          <Button
            onClick={handleGoogleSubmit}
            disabled={isLoading}
            variant="contained"
            color="secondary"
            disableElevation
          >
            Gmail login
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            variant="contained"
            color="primary"
            disableElevation
          >
            Email Login
          </Button>
        </Box>

        <p>
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
        <p>
          Not registered yet? <Link to="/register">Register here</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
