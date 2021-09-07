import React from 'react';
// import { render } from 'react-dom';
import { useRoutes } from 'hookrouter'
import routes from './Router';

const App = () => {
  const routeResult = useRoutes(routes) // enable routes
  return (
    <>
      {/* If authenticate, route to login page */}
      {routeResult}
    </>
  )
}

export default App;