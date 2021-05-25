import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

function Register() {

    const [email, setEmail ] = useState('');
    const [loading, setLoading ] = useState(false);
    const [message, setMessage ] = useState('');
    const [error, setError ] = useState('');

    const { resetPassword } = useAuth();

    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(email);
            setEmail('');
            setMessage('Check your mail inbox for password reset link');
        } catch {
            setError('Failed to reset password!');
        }
        setLoading(false);
    } 

    return (
        <LoginPanel>

            <h1>Reset Password</h1>

            { error && <Alert severity="error">{ error }</Alert> }
            { message && <Alert severity="info">{ message }</Alert> }
            
            <form onSubmit={handleSubmit} className="form" autoComplete="off">

                <TextField 
                    onChange={e => setEmail(e.target.value)} 
                    type="email" 
                    label="Email"
                    className={classes.textField}
                />
                <Button 
                    type="submit" 
                    disabled={loading} 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    disableElevation
                >Reset</Button>

                <p><Link to="/login">Back to Login</Link></p>

            </form>
        </LoginPanel>
    )
}

export default Register

const LoginPanel = styled.div`
    margin-top: 120px;
    width: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #ECF0F1;
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
`

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
    }
  });
