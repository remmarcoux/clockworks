import React from 'react';

/// Props
/// - ticked
/// - clockSize
/// - value
class ClockSegment extends React.Component {
  render(){
    var tickedClass = this.props.ticked ? "ticked" : "unticked";  
    var circleAngle = 360 / this.props.clockSize;
    var skew = 90 - circleAngle;

    var rotationAngle = ( circleAngle * ( this.props.value ) );

    var style = {
      transform: "rotate(" + rotationAngle + "deg) skew(0, " + skew + "deg)"
    };

    return (
      <div onClick={this.onSegmentClicked } 
           className={ "clock-segment " + tickedClass }
           style={ style }>
      </div>
    );
  }

  onSegmentClicked = (e) => {
    this.props.onClockChange( this.props.value );
  }
}

export default ClockSegment;