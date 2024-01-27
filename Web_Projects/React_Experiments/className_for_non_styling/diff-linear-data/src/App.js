import logo from './logo.svg';
import './App.css';
import DataDisplay from './components/DataDisplay';

function App() {

  const data = [
    { type: 'A', content: 'Data A1' },
    { type: 'B', content: 'Data B1' },
    { type: 'A', content: 'Data A2' },
    // ... more data
  ];


  return (
    <div className="App">
      <DataDisplay data={data} />
    </div>
  );
}

export default App;
