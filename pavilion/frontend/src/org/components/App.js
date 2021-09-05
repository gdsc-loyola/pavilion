import Dashboard from '../views/Dashboard';
import React, { Component } from 'react';
// import { render } from 'react-dom';
import { useRoutes } from 'hookrouter'
import routes from './Router';

const App = () => {
  const routeResult = useRoutes(routes)
  return (
    <>
      {routeResult}
    </>
  )
}

export default App;