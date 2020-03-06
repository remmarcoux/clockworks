import React from 'react';
import Clock from './clock';
import ClockEdit from './clockEdit';

/// Props
/// - clockInfos
/// - onNameChanged
/// - onValueChanged
/// - onSegmentsCountChanged
/// - onColorChanged
/// - onDelete
/// - onClockMove
/// - isLast
class ClockControls extends React.Component {
    state = {
        dirty: false,
        clockInfos: this.props.clockInfos,
    }

    render() {
        var infos = this.state.dirty === true ? this.state.clockInfos : this.props.clockInfos;

        return (
            <div className={ `clock-container ${infos.color}` }>
                <Clock clockInfos={ infos }
                       onValueChanged={ this.onValueChanged } />
                <ClockEdit clockInfos={ infos }
                           onSegmentsCountChanged={ this.onSegmentsCountChanged } 
                           onColorChanged={ this.onColorChanged }
                           onDeleteClicked={ this.onDeleteClicked }
                           onClockMove = { this.onClockMove }
                           isLast={ this.props.isLast } />
                <input className="clock-label" 
                       value={ infos.name } 
                       onChange={ this.onNameChangedInternal }
                       onBlur={ this.onNameChanged } />
            </div>
        );
    }

    onNameChangedInternal = (e)=> { 
        var infos = this.state.clockInfos;
        infos.name = e.target.value;

        this.setState({
            dirty: true,
            clockInfos: infos
        });
    }

    onNameChanged = (e) => {
        this.setState({
            dirty: false
        });
        this.props.onNameChanged(this.props.clockInfos._id, this.state.clockInfos.name);
    }

    onDeleteClicked = (e) => {
        this.props.onDelete(this.props.clockInfos._id);
    }

    onSegmentsCountChanged = (newValue) => {
        this.props.onSegmentsCountChanged(this.props.clockInfos._id, newValue);
    }

    onValueChanged = (newValue) => {
        this.props.onValueChanged(this.props.clockInfos._id, newValue);
    }

    onColorChanged = (newValue) => {
        this.props.onColorChanged(this.props.clockInfos._id, newValue);
    }

    onClockMove = (direction) => {
        this.props.onClockMove(this.props.clockInfos, direction);
    }
}

export default ClockControls;