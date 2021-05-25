import React, { useState } from 'react'
import { auth } from '../firebase';
import { Link, useHistory } from 'react-router-dom';

import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';

function Login() {

    const [user, setUser ] = useState({email: "", password: ""});
    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState('');

    const history = useHistory();

    const classes = useStyles();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setError('');
            setLoading(true);
            await auth.signInWithEmailAndPassword(user.email, user.password);
            history.push('/');
        } catch {
            setError('Failed to login!');
        }
        setLoading(false);
    } 

    return (
        <LoginPanel>

            <h1>Login</h1>

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
                >Login</Button>

                <p><Link to="/forgot-password">Forgot your password?</Link></p>
                <p>Not registered yet? <Link to="/register">Register here</Link></p>

            </form>
        </LoginPanel>
    )
}

export default Login

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