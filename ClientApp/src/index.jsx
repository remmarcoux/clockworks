import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clockworks from './clockworks';
import * as serviceWorker from './serviceWorker';

var appContext = (
    <div className="App">
    <header className="App-header">
      <h1>ClockWorks</h1>
    </header>
    <main>
        <Clockworks />
    </main>
    <footer>
    </footer>
  </div>
)
ReactDOM.render(appContext, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
