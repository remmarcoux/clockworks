import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clockworks from './clockworks';
import * as serviceWorker from './serviceWorker';
import MetaTags from "react-meta-tags";

var appContext = (
  <div className="App">
    <MetaTags>
      <title>Clockworks - A Blades in the Dark clocks manager</title>
      <meta name="description" content="A simple Clock Tracking App for Blades in the Dark - save trees, create digital clocks ^^" />
    </MetaTags>
    <header className="App-header">
      <h1>ClockWorks</h1>
    </header>
    <main>
        <Clockworks />
    </main>
    <footer>
      <a href="https://github.com/remmarcoux/clockworks">Clockworks Project on Github</a>
    </footer>
  </div>
)
ReactDOM.render(appContext, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
