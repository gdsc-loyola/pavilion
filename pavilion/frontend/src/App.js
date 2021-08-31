import { render } from 'react-dom';
import Dashboard from './org/views/Dashboard';

function App() {
  return (
    <Dashboard />
  );
}

export default App;

const container = document.getElementById('app');
render(<App />, container);