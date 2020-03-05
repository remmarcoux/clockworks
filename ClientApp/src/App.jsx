import React from 'react';
import ClockControls from './clocks/clockControls';
import ClockMaster from './clocks/clockMaster';
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
                                   onValueChanged={ this.onValueChanged }
                                   key={ clocks.length } />);
      });
    }
    return (
      <div className="clocks-master-container">
        {clocks}
        <div className="clocks-master-controls">
          <ClockMaster onAddClock={ this.onAddClock } />
        </div>
      </div>
    );  
  }

  componentDidMount() {
    this.refreshClocksInfos();
    this.startPolling();
  }

  componentWillUnmount() {
    this.stopPolling();
  }

  startPolling = () => {
    if(this.polling != null)
    {
      this.stopPolling();
    }

    this.polling = setInterval(this.refreshClocksInfos, 5000);
  }

  stopPolling = () => {
    if(this.polling != null)
    {
      clearInterval(this.polling);
    }
    this.polling = null;
  }

  setClocksInfos = (data) => {
    this.setState({
      clocks: data
    });
  }

  // Event Listeners
  changeField = (id, field, data) => {
    var clocks = this.state.clocks;
    var clockIndex = clocks.findIndex((clock)=>clock._id === id);
    var updatedClock = clocks[clockIndex];
    
    updatedClock[field] = data;
    updatedClock._id = undefined;
    clocks[clockIndex] = updatedClock;

    this.setState({
      clocks
    }, ()=>{ this.putClockById(id, updatedClock);
             this.refreshClocksInfos(); } );
  }

  onNameChanged = (id, name) =>{
    this.changeField(id, "name", name);
  }

  onValueChanged = (id, value) => {
    this.changeField(id, "value", value);
  }

  onAddClock = (clockName, segmentsCount) => {
    var data = {
      name: clockName,
      segments: segmentsCount,
      value: 0
    };
    this.postNewClock(data)
  }

  onClockAdded = () => {
    // TODO: Awaiting refresh, we should put a screen blocker of sorts

    this.refreshClocksInfos();
  }

  // Connexion Stuff
  refreshClocksInfos = () => {
    this.stopPolling();
    return fetch(`/api/v1/clock/list?t=${Date.now()}`).then(this.onDataRecieved)
                                                      .then(this.setClocksInfos)
                                                      .then(this.startPolling);
  }

  postNewClock = (clockInfo) => {
    // Stop polling during operations
    this.stopPolling();

    return fetch(`/api/v1/clock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(clockInfo)
    }).then(this.onClockAdded);
  }

  putClockById = (clockId, clockInfo) => {
    return fetch(`/api/v1/clock/${clockId}`, {
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
