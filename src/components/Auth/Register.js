import React, { useState, useEffect } from 'react';
import { auth } from '../../firebase';
import { Link, useHistory } from 'react-router-dom';
import './login.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');

  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const history = useHistory();

  const emailRegex = /^\S+@\S+\.\S+$/;

  useEffect(() => {
    setIsValid(
      email && emailRegex.test(email) && password && passwordRepeat && password === passwordRepeat,
    );
  }, [email, password, passwordRepeat]);

  const handleSubmit = async e => {
    e.preventDefault();
    if (isValid && !isLoading) {
      try {
        setError('');
        setIsLoading(true);
        await auth.createUserWithEmailAndPassword(email, password);
        history.push('/');
      } catch {
        setError('Failed to create an account!');
      }
      setIsLoading(false);
    }
  };

  return (
    <div className="login">
      <h1>Register</h1>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit} className="form" autoComplete="off">
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          type="password"
          label="Repeat Password"
          value={passwordRepeat}
          onChange={e => setPasswordRepeat(e.target.value)}
        />
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          variant="contained"
          color="primary"
          disableElevation
        >
          Register me
        </Button>

        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
