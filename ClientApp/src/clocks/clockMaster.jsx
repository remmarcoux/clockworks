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
            <div className="clocks-master-controls clock-container">
                <div className="clock-option-pannel">

                    <div className="clock-master-option">
                        <label htmlFor="clockName">Clock Name</label>
                        <input type="text" 
                            name="clockName" 
                            id="new-clock-name"
                            value={ this.state.clockName }
                            onChange={ this.onClockNameChanged } />
                    </div>
                    <div className="clock-master-option">
                        <label htmlFor="segmentsCount"># Segments</label>
                        <input type="number"
                            name="segmentsCount" 
                            id="new-clock-segments-count" 
                            value={this.state.segmentsCount}
                            onChange={ this.onClockSegmentsCountChanged }  />
                    </div>

                    <button className="clock-add" onClick={ this.onAddClock } >Add Clock</button>
                </div>
            </div>
        );
    }

    onClockNameChanged = (e) => {
        var value = e.target.value;
        this.setState({clockName: value });
    }

    onClockSegmentsCountChanged = (e) => {
        var value = e.target.value;

        if( isNaN( value ) && value !== "" )
        {
            return;
        }

        if(value <= 2 && value !== "")
        {
            value = 2;
        }

        this.setState({segmentsCount: value});
    }

    onAddClock = () => {
        if( this.state.segmentsCount === "")
        {
            this.state.segmentsCount = this.defaultClockState.segmentsCount;
        }
        
        this.props.onAddClock(this.state.clockName, this.state.segmentsCount);
        this.setState(this.defaultClockState);
    }
}

export default ClockMaster;