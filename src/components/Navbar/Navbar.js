import React from 'react';
import useStore from '../../store';

import Counter from './Counter';
import './navbar.css';

function Navbar() {
  const appName = useStore(state => state.appName);

  return (
    <div className="navbar">
      <div className="logo">
        <h1>{appName}</h1>
        <small className="undertitle">by Dejo 2021</small>
      </div>

      <Counter />
    </div>
  );
}

export default Navbar;
