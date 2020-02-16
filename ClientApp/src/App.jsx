import React from 'react';
import ClockControls from './clocks/clockControls';
import './App.css';

class App extends React.Component {
  polling = null;

  render() {
    var clocks = [];
    if(this.state && this.state.clocks)
    {
      this.state.clocks.forEach(clock => {
        clocks.push(<ClockControls clockInfos={ clock }
                                   onNameChanged={ this.onNameChanged }
                                   onValueChanged={ this.onValueChanged } />);
      });
    }
    return (
      <div className="App">
        <header className="App-header">
          <h1>ClockWorks</h1>
        </header>
        <main>
          { clocks }
        </main>
        <footer>
        </footer>
      </div>
    );  
  }

  componentDidMount() {
    this.fetchClocksInfos();
    this.polling = setInterval(this.fetchClocksInfos, 5000);
  }

  componentWillUnmount() {
    clearInterval(this.polling);
  }

  setClocksInfos = (data) => {
    this.setState({
      clocks: data
    });
  }

  // Event Listeners
  changeField = (id, field, data) => {
    var clocks = this.state.clocks;
    var clockIndex = clocks.findIndex((clock)=>clock._id == id);
    var updatedClock = clocks[clockIndex];
    
    updatedClock[field] = data;
    updatedClock._id = undefined;
    clocks[clockIndex] = updatedClock;

    this.setState({
      clocks
    }, ()=>{ this.putClockById(id, updatedClock);
             this.fetchClocksInfos(); } );
  }

  onNameChanged = (id, name) =>{
    this.changeField(id, "name", name);
  }

  onValueChanged= (id, value) => {
    this.changeField(id, "value", value);
  }

  // Connexion Stuff
  fetchClocksInfos = () => {
    fetch(`/api/v1/clock/list?t=${Date.now()}`).then(this.onDataRecieved)
                                               .then(this.setClocksInfos);
  }

  putClockById = (clockId, clockInfo) => {
    fetch(`/api/v1/clock/${clockId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(clockInfo)
    });
  }

  onDataRecieved = (res) => {
    if(res.ok){ 
      return res.json();
    } else { 
      console.log("To Be Implemented");
    } 
  }
}

export default App;
