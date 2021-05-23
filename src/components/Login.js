import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';

function Register() {

    const [user, setUser ] = useState({email: "", password: ""});
    const [loading, setLoading ] = useState(false);
    const [error, setError ] = useState('');

    const { login } = useAuth();
    const history = useHistory();

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(user);
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
                    value={user.email} 
                    onChange={e => setUser({ ...user, email: e.target.value })} 
                    type="email" 
                    label="Email" 
                />
                <TextField 
                    value={user.password} 
                    onChange={e => setUser({ ...user, password: e.target.value })} 
                    type="password" 
                    label="Password" 
                />
                <Button 
                    type="submit" 
                    disabled={loading} 
                    variant="contained" 
                    color="primary" 
                    disableElevation
                >Login</Button>

                <p><Link to="/forgot-password">Forgot your password?</Link></p>
                <p>Not registered? <Link to="/register">Register</Link></p>

            </form>
        </LoginPanel>
    )
}

export default Register

const LoginPanel = styled.div`
    margin-top: 120px;
    width: 400px;
    display: flex;
    flex-wrap: nowrap;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    margin-left: auto;
    margin-right: auto;
    background-color: #ECF0F1;
    border: 2px solid black;
    border-radius: 12px;

    .form {
        display: flex;
        flex-direction: column;

      
    }
`