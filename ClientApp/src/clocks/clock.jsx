import React from 'react';
import ClockSegment from './clockSegment';
import "./clock.css"
import "./clock-variants.css"

/// Props
/// - clockInfos
/// - onValueChanged
class Clock extends React.Component {
  render() {
    var infos = this.props.clockInfos;
    var onClockChange = (number) => {
      var newCount = infos.value === number ? number - 1 : number; 
      this.props.onValueChanged(newCount);
    }

    var segments = []
    
    for(var i=infos.segments; i>0; i--)
    {
      segments.push(<ClockSegment ticked={ i <= infos.value } 
                                  clockSize={ infos.segments } 
                                  value={ i } 
                                  key={ i }
                                  onClockChange={ onClockChange } />);
    }
    
    return (
      <div className="clock">
          { segments }
      </div>
    );
  }
}

export default Clock;