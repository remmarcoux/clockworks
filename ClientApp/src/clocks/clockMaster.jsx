import React from 'react';

/// Props
/// - onAddClock
class ClockMaster extends React.Component {
    defaultClockState = {
        clockName: "",
        segmentsCount: 4,
    }

    state = this.defaultClockState

    render() {
        return (
            <div className="clock-master-controls clock-container">
                <input type="text" 
                       name="clockName" 
                       id="new-clock-name"
                       onChange={ this.onClockNameChanged } />
                <input type="number"
                       name="segmentsCount" 
                       id="new-clock-segments-count" 
                       value={this.state.segmentsCount}
                       onChange={ this.onClockSegmentsCountChanged }  />

                <button className="clock-add" onClick={ this.onAddClock } >Add Clock</button>
            </div>
        );
    }

    onClockNameChanged = (e) => {
        var value = e.target.value;
        this.setState({clockName: value });
    }

    onClockSegmentsCountChanged = (e) => {
        var value = e.target.value;

        if( isNaN( value ) )
        {
            value = this.defaultClockState.segmentsCount;
        }

        if( value <= 2 )
        {
            value = this.defaultClockState.segmentsCount;
        }

        this.setState({segmentsCount: value});
    }

    onAddClock = () => {
        this.props.onAddClock(this.state.clockName, this.state.segmentsCount);
        this.setState(this.defaultClockState);
    }
}

export default ClockMaster;