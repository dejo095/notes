import React from 'react';
import notesStore from '../store/index';
import styled from 'styled-components';

function Navbar() {

    const count = notesStore(state => state.count());

    return (
        <Nav>
            <h1>NotesApp</h1>
            <Counter>
                <h3>Dejo</h3>
                <>
                { count > 0 
                    ? <p>You have <strong>{ count }</strong> notes!</p> 
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
    }

    p {
        text-align: right;
        margin: 0px;
        padding: 0px;
    }
`