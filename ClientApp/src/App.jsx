import React from 'react';
import ClockControls from './clocks/clockControls';
import ClockMaster from './clocks/clockMaster';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css'

class App extends React.Component {
  polling = null;

  render() {
    var clocks = [];
    if(this.state && this.state.clocks)
    {
      var sortedClocks = this.state.clocks.sort((left, right)=>{ return left.order - right.order; });
      sortedClocks.forEach((clock, i, array) => {
        clocks.push(<ClockControls clockInfos={ clock }
                                   onNameChanged={ this.onNameChanged }
                                   onValueChanged={ this.onValueChanged }
                                   onSegmentsCountChanged={ this.onSegmentsCountChanged }
                                   onColorChanged={ this.onColorChanged }
                                   onDelete={ this.onDeleteClock }
                                   onClockMove={ this.onClockMove }
                                   isLast={ i === array.length -1 }
                                   key={ clocks.length } />);
      });
    }
    
    return (
      <div className="clocks-master-container">
        {clocks}
        <ClockMaster onAddClock={ this.onAddClock } />
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

  onSegmentsCountChanged = (id, value) => {
    this.changeField(id, "segments", value);
  }

  onColorChanged = (id, value) => {
    this.changeField(id, "color", value);
  }

  onAddClock = (clockName, segmentsCount) => {
    var data = {
      name: clockName,
      segments: segmentsCount,
      value: 0,
      order: this.state.clocks.length
    };
    this.postNewClock(data)
  }

  onClockMove = (clockInfos, direction) => {
    var newOrder = clockInfos.order + direction;
    var modifiedClocks = [];
    this.state.clocks.forEach(clock => {
      if(clock._id === clockInfos._id)
      {
        var newBaseClock = clock;
        newBaseClock.order = newOrder;
        modifiedClocks.push(newBaseClock);
        return;
      }

      if((direction < 0 && clock.order >= newOrder && clock.order <= clockInfos.order) || (direction > 0 && clock.order <= newOrder && clock.order >= clockInfos.order))
      {
        var newClock = clock;
        newClock.order += direction < 0 ? 1 : -1;
        modifiedClocks.push(newClock);
      }
    });

    var promise = null;
    for(var i=0; i<modifiedClocks.length; i++)
    {
      if(i===0)
      {
        promise = this.putClockById(modifiedClocks[i]._id, modifiedClocks[i]);
        continue;
      }

      var clock = modifiedClocks[i];
      promise = promise.then(()=>{ return this.putClockById(clock._id, clock) });
    }

    if(promise !== null)
    {
      promise.then(this.refreshClocksInfos);
    }
  }

  onDeleteClock = (clockId) => {
    var clocks = this.state.clocks;
    clocks = clocks.filter((value, index, arr)=>{ return value._id !== clockId; });
    this.setState({clocks: clocks});

    this.deleteClockById(clockId);
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
    })
    .then(this.refreshClocksInfos)
    .then(this.startPolling);
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

  deleteClockById = (clockId) => {
    this.stopPolling();
    return fetch(`/api/v1/clock/${clockId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(this.refreshClocksInfos)
    .then(this.startPolling);
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
