import React from 'react';

/// Props
/// - ticked
/// - clockSize
/// - value
class ClockSegment extends React.Component {
  render(){
    var tickedClass = this.props.ticked ? "ticked" : "unticked";  

    return (
      <div onClick={this.onSegmentClicked } 
           className={ "clock-segment " + tickedClass }
           style={ this.getSegmentStyle() }>
      </div>
    );
  }

  getSegmentStyle = () => {
    var rotationAngle;
    if(this.props.clockSize === 2)
    {
      // Fix for size 2 clocks
      var position = this.props.value === 1 ? "calc(-100% - 2px)" : "-2px";
      rotationAngle = this.props.value === 1 ? 180 : 0;
      return {
        transform: "rotate(" + rotationAngle + "deg)",
        top: position
      }
    }

    var circleAngle = 360 / this.props.clockSize;
    var skew = 90 - circleAngle;

    rotationAngle = ( circleAngle * ( this.props.value ) );

    return {
      transform: "rotate(" + rotationAngle + "deg) skew(0, " + skew + "deg)"
    }
  }

  onSegmentClicked = (e) => {
    this.props.onClockChange( this.props.value );
  }
}

export default ClockSegment;