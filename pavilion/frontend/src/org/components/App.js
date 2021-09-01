import Dashboard from '../views/Dashboard';
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Dashboard />
      </div>
    );
  }
}

export default App;

const container = document.getElementById('app');
render(<App />, container);