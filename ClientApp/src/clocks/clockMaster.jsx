import React from 'react';

/// Props
/// - onAddClock
class ClockMaster extends React.Component {
    defaultClockAddState = {
        clockName: "",
        segmentsCount: 4,
    }

    state = this.defaultClockAddState

    render() {
        return (
            <div className={ "clocks-master-controls clock-container" + (this.state.opened ? " opened" : "") }>
                <div className="clock-option-pannel">
                    <div className="clock-option-wrapper">
                        <div className="clock-master-option">
                            <label htmlFor="clockName">Clock Name</label>
                            <input type="text" 
                                disabled={ !this.state.opened }
                                name="clockName" 
                                id="new-clock-name"
                                value={ this.state.clockName }
                                onChange={ this.onClockNameChanged } />
                        </div>
                        <div className="clock-master-option">
                            <label htmlFor="segmentsCount"># Segments</label>
                            <input type="number"
                                disabled={ !this.state.opened }
                                name="segmentsCount" 
                                id="new-clock-segments-count" 
                                value={ this.state.segmentsCount }
                                onChange={ this.onClockSegmentsCountChanged }
                                onBlur={ this.onClockSegmentsCountBlurred }  />
                        </div>

                        <button className="clock-add"
                                disabled={ !this.state.opened } 
                                onClick={ this.toggleClockAdd } >Cancel</button>

                        <button className="clock-add"
                                disabled={ !this.state.opened || this.state.clockName === "" } 
                                onClick={ this.onAddClock } >Add Clock</button>
                    </div>
                    <button className="clock-option-toggle-add-menu"
                            disabled={ this.state.opened }
                            onClick={ this.toggleClockAdd }>
                        <i className="fas fa-plus-square"></i>
                    </button>
                </div>
            </div>
        );
    }

    toggleClockAdd = (e) => {
        this.setState({opened: !this.state.opened});
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
            segmentsCount = this.defaultClockAddState.segmentsCount;
        }
        
        this.props.onAddClock(this.state.clockName, segmentsCount);
        this.setState(this.defaultClockAddState);
    }
}

export default ClockMaster;