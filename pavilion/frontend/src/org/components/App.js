import Dashboard from '../views/Dashboard';
import SSUOrgSide from '../views/SelfSignUp';
import React, { Component } from 'react';
import { render } from 'react-dom';

class App extends Component {
  render() {
    return (
      <div>
        <SSUOrgSide />
      </div>
    );
  }
}

export default App;

const container = document.getElementById('app');
render(<App />, container)