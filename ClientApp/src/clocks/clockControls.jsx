import React from 'react';
import Clock from './clock';

/// Props
/// - clockInfos
/// - onNameChanged
/// - onValueChanged
/// - onDelete
class ClockControls extends React.Component {
    state = {
        dirty: false,
        clockInfos: this.props.clockInfos,
    }

    render() {
        var infos = this.state.dirty === true ? this.state.clockInfos : this.props.clockInfos;

        return (
            <div className="clock-container">
                <Clock clockInfos={ infos }
                       onValueChanged={ this.onValueChanged } />
                <input className="clock-label" 
                       value={ infos.name } 
                       onChange={ this.onNameChangedInternal }
                       onBlur={ this.onNameChanged } />
                <button className="clock-delete" 
                        onClick={ this.onDeleteClicked } >
                    <i className="fas fa-ban" />
                </button>
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

    onValueChanged = (newValue) => {
        this.props.onValueChanged(this.props.clockInfos._id, newValue)
    }
}

export default ClockControls;