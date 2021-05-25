import React, { useState } from 'react';
import { auth } from '../firebase';
import useStore from '../store';
import useCredentialsStore from '../credentialsStore';
import { useHistory } from 'react-router-dom';

import styled from 'styled-components';

function Navbar() {

    const [error, setError ] = useState('');
    const count = useStore(state => state.count());
    const currentUser = useCredentialsStore(state => state.currentUser);
    // const setLogout = useCredentialsStore(state => state.setLogout);
    const history = useHistory();

    const handleLogout = async () => {
        setError('');
        try {
            await auth.signOut();
            // await setLogout();
            history.push('/login');
        } catch {
            setError('Error occured during logout!')
        }
    }

    return (
        <Nav>
            <h1>NotesApp</h1>
            <Counter>
                <h3><small>Logged in as: </small><a onClick={handleLogout}>{ currentUser && currentUser.displayName || currentUser.email }</a></h3>
                <>
                { count > 0 
                    ? <p>You have <span><strong>{ count }</strong></span> notes!</p> 
                    : <p>No notes!</p>
                }
                </>
            </Counter>
        </Nav>
    )
}

export default Navbar

const Nav = styled.div`
    width:100%;
    height: 80px;
    padding: 10px;
    box-sizing: border-box;
    background-color: #462446;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h1 {
        flex:1;
        color: #EB6B56;
        text-shadow: 0px 1px 2px black;
    }
`

const Counter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    color: white;

    h3 {
        margin: 0;

        small {
            font-size: small;
            font-family: monospace;
        }

        a:hover {
            text-decoration: underline;
            color: blue;
            cursor: pointer;

        }
    }

    p {
        text-align: right;
        margin: 0px;
        padding: 0px;
        font-size: small;
        font-family: monospace;

        span {
            color: orangered;
            font-size: large;
        }
    }
`