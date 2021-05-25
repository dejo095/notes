import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useCredentialsStore from './credentialsStore';

function PrivateRoute({ component: Component, ...rest}) {

  const currentUser = useCredentialsStore(state => state.currentUser);

  return (
    <Route
      { ...rest }
      render = { props => {
        return currentUser ? <Component {...props} /> : <Redirect to="/login" />
      }} >
    </Route>
  )
}

export default PrivateRoute
