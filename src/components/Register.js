import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { Link, useHistory } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
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

  const classes = useStyles();

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
    <LoginPanel>
      <h1>Register</h1>

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit} className="form" autoComplete="off">
        <TextField
          type="email"
          label="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={classes.textField}
        />
        <TextField
          type="password"
          label="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={classes.textField}
        />
        <TextField
          type="password"
          label="Repeat Password"
          value={passwordRepeat}
          onChange={e => setPasswordRepeat(e.target.value)}
          className={classes.textField}
        />
        <Button
          type="submit"
          disabled={!isValid || isLoading}
          variant="contained"
          color="primary"
          className={classes.button}
          disableElevation
        >
          Register me
        </Button>

        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </LoginPanel>
  );
}

export default Register;

const LoginPanel = styled.div`
  margin-top: 120px;
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #ecf0f1;
  border: 2px solid black;
  border-radius: 12px;

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;

    p {
      margin: 10px auto;
    }
  }
`;

const useStyles = makeStyles({
  textField: {
    marginBottom: 16,
    minWidth: 300,
  },
  button: {
    width: 160,
    marginTop: 20,
    paddingTop: 12,
    paddingBottom: 12,
  },
});
