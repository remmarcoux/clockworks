import React from 'react';
import ClockSegment from './clockSegment';

const CLOCK_STORAGE = "clocks";

class Clock extends React.Component {
  render() {
    var currentValue = this.GetClockValue();
    var segments = []
    
    var onClockChange = (number) => {
      var newCount = currentValue == number ? number - 1 : number; 
      this.ChangeClock(newCount);
    }

    for(var i=this.props.clockSize; i>0; i--)
    {
      segments.push(<ClockSegment ticked={ i <= currentValue } 
                                  clockSize={ this.props.clockSize } 
                                  value={ i } 
                                  key={ i }
                                  onClockChange={ onClockChange } />);
    }
    
    return (
      <div className={ "clock-container clock-" + this.props.clockSize }>
        <div className="clock">
            { segments }
        </div>
        {/* <button>Delete</button> */}
      </div>
    )
  }

  ChangeClock(number) {
    var newSave = this.GetClocksStorage();
    if(!newSave[this.props.clockSize]) {
      newSave[this.props.clockSize] = {};
    }

    newSave[this.props.clockSize][this.props.id] = JSON.stringify(number);

    this.SetClockStorage(newSave);
    this.forceUpdate();
  }

  // Values Wrappers
  GetClockValue() {
    return this.GetClockData()[ this.props.id ] || -1;
  }

  GetClockData() { 
    return this.GetClocksStorage()[ this.props.clockSize ] || {};
  }
  
  // Storage Control
  GetClocksStorage() {
    var rawStorage = window.localStorage.getItem(CLOCK_STORAGE);
    return rawStorage ? JSON.parse(rawStorage) : {};
  }

  SetClockStorage(storageData) {
    window.localStorage.setItem(CLOCK_STORAGE, JSON.stringify(storageData));
  }
}

export default Clock;