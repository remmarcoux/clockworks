import React from 'react';
import Clock from './clocks/clock';
import './App.css';

const CLOCK_LAST_ID = "lastClockId";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>ClockWorks</h1>
      </header>
      <main>

        <Clock id="0" clockSize={ 4 } />
      </main>
      <footer>
        {/* <button>Add 4 Clock</button>
        <button>Add 6 Clock</button>
        <button>Add 8 Clock</button> */}
      </footer>
    </div>
  );
}

export default App;
