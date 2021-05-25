import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import Alert from '@material-ui/lab/Alert';

import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, useHistory } from 'react-router-dom';

function Register() {

    const [user, setUser ] = useState({email: "", password: ""});
    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState('');

    const { register } = useAuth();
    const history = useHistory();

    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await register(user);
            history.push('/');
        } catch {
            setError('Failed to create an account!');
        }
        setLoading(false);
    } 

    return (
        <LoginPanel>

            <h1>Register</h1>

            { error && <Alert severity="error">{ error }</Alert> }
            
            <form onSubmit={handleSubmit} className="form" autoComplete="off">

                <TextField 
                    onChange={e => setUser({ ...user, email: e.target.value })} 
                    type="email" 
                    label="Email" 
                    className={classes.textField}
                />
                <TextField 
                    onChange={e => setUser({ ...user, password: e.target.value })} 
                    type="password" 
                    label="Password" 
                    className={classes.textField}
                />
                <Button 
                    type="submit" 
                    disabled={loading} 
                    variant="contained" 
                    color="primary" 
                    className={classes.button}
                    disableElevation
                >Register me</Button>

                <p>Already registered? <Link to="/login">Login</Link></p>

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
  