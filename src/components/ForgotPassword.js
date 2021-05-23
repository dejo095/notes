import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function Register() {

    const [user, setUser ] = useState({email: "", password: ""});
    const [loading, setLoading ] = useState(false);
    const [message, setMessage ] = useState('');
    const [error, setError ] = useState('');

    const { resetPassword } = useAuth();

    const handleSubmit = async (e) => {
        
        e.preventDefault();

        try {
            setError('');
            setMessage('');
            setLoading(true);
            await resetPassword(user.email);
            setMessage('Check your email inbox for reset password link');
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
                    value={user.email} 
                    onChange={e => setUser({ ...user, email: e.target.value })} 
                    type="email" 
                    label="Email" 
                />
                <Button 
                    type="submit" 
                    disabled={loading} 
                    variant="contained" 
                    color="primary" 
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