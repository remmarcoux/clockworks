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
                            onChange={ this.onClockSegmentsCountChanged }
                            onBlur={ this.onClockSegmentsCountBlurred }  />
                    </div>

                    <button className="clock-add"
                            disabled={ this.state.clockName === "" } 
                            onClick={ this.onAddClock } >Add Clock</button>
                </div>
            </div>
        );
    }

    onClockNameChanged = (e) => {
        var value = e.target.value;
        this.setState({clockName: value });
    }

    onClockSegmentsCountChanged = (e) => {
        var value = e.target.valueAsNumber;

        if(isNaN(value))
        {
            value = "";
        }

        this.setState({segmentsCount: value });
    }
    
    onClockSegmentsCountBlurred = (e) => {
        var value = e.target.value;

        if( isNaN( value ) || value === "" || value < 2 )
        {
            value = 2;
        }

        this.setState({segmentsCount: value});
    }

    onAddClock = () => {
        var segmentsCount = this.state.segmentsCount; 
        if( segmentsCount === "")
        {
            segmentsCount = this.defaultClockState.segmentsCount;
        }
        
        this.props.onAddClock(this.state.clockName, segmentsCount);
        this.setState(this.defaultClockState);
    }
}

export default ClockMaster;