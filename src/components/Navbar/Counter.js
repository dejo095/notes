import React, { useState } from 'react';
import { auth } from '../../firebase';
import useStore from '../../store';
import { useHistory } from 'react-router-dom';

import './counter.css';

function Counter() {
  const [error, setError] = useState('');
  const count = useStore(state => state.count());
  const currentUser = useStore(state => state.currentUser);
  const setCurrentUser = useStore(state => state.setCurrentUser);
  const history = useHistory();

  const handleLogout = async () => {
    setError('');
    try {
      await auth.signOut();
      setCurrentUser(null);
      history.push('/login');
    } catch {
      setError('Error occured during logout!');
    }
  };

  return (
    <div className="counter">
      <h3>
        <small></small>
        <a onClick={handleLogout}>
          {(currentUser && currentUser.displayName) || (currentUser && currentUser.email)}
        </a>
      </h3>
      <>
        {count <= 0 ? (
          <p>No notes!</p>
        ) : (
          <p>
            You have&nbsp;
            <span>
              <strong>{count}</strong>
            </span>
            &nbsp;notes!
          </p>
        )}
      </>
    </div>
  );
}

export default Counter;
