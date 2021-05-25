import React from 'react'
import useStore from './store';
import { Redirect, Route } from 'react-router-dom'

function PrivateRoute({ component: Component, ...rest}) {

  const currentUser = useStore(state => state.currentUser);

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
