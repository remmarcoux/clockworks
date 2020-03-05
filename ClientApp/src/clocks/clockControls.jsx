import React from 'react';
import Clock from './clock';

/// Props
/// - clockInfos
/// - onNameChanged
/// - onValueChanged
/// - onDelete
class ClockControls extends React.Component {
    state = {
        name: this.props.clockInfos.name
    }

    render() {
        var infos = this.props.clockInfos;

        return (
            <div className="clock-container">
                <Clock clockInfos={ infos }
                       onValueChanged={ this.onValueChanged } />
                <input className="clock-label" 
                       value={ this.state.name } 
                       onChange={ this.onNameChangedInternal }
                       onBlur={ this.onNameChanged } />
                <button className="clock-delete" onClick={ this.onDeleteClicked } ><i className="fas fa-ban" /></button>
            </div>
        );
    }

    onNameChangedInternal = (e)=> { 
        this.setState({name: e.target.value});
    }

    onNameChanged = (e) => {
        this.props.onNameChanged(this.props.clockInfos._id, this.state.name);
    }

    onDeleteClicked = (e) => {
        this.props.onDelete(this.props.clockInfos._id);
    }

    onValueChanged = (newValue) => {
        this.props.onValueChanged(this.props.clockInfos._id, newValue)
    }
}

export default ClockControls;