import React, { useState } from 'react';
import { auth } from '../../firebase';
import { Link } from 'react-router-dom';
import './login.css';

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

function Register() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setError('');
      setMessage('');
      setLoading(true);
      await auth.sendPasswordResetEmail(email);
      setEmail('');
      setMessage('Check your mail inbox for password reset link');
    } catch {
      setError('Failed to reset password!');
    }
    setLoading(false);
  };

  return (
    <div className="login">
      <h1>Reset Password</h1>

      {error && <Alert severity="error">{error}</Alert>}
      {message && <Alert severity="info">{message}</Alert>}

      <form onSubmit={handleSubmit} className="form" autoComplete="off">
        <TextField
          onChange={e => setEmail(e.target.value)}
          type="email"
          label="Provide your Email here"
        />
        <Button
          type="submit"
          disabled={loading}
          variant="contained"
          color="primary"
          disableElevation
        >
          Send reset password link
        </Button>

        <p>
          <Link to="/login">Back to Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
