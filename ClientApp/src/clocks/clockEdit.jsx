import React from 'react';

/// Props
/// clockInfos
/// onSegmentsCountChanged
/// onColorChanged
/// onDeleteClicked
class ClockEdit extends React.Component {
    state = {
        opened: false,
        dirty: false,
        clockInfos: this.props.clockInfos,
        colors: [
            {
                label: "Default",
                value: ""
            },
            {
                label: "Red",
                value: "red"
            },
            {
                label: "Green",
                value: "green"
            },
        ]
    }

    render() {
        var clockInfos = this.state.dirty === true ? this.state.clockInfos : this.props.clockInfos;
        var colors = [];
        this.state.colors.forEach((colorInfo) =>{
            colors.push(<option value={colorInfo.value} 
                                selected={clockInfos.color === colorInfo.value}
                                key={colors.length}>{colorInfo.label}</option>)
        });
        return (
            <div className={`clock-settings ${this.state.opened ? 'opened' : 'closed'}`}>
                <div className="clock-settings-pannel">
                    <button className="clock-delete" 
                            disabled={!this.state.opened}
                            onClick={ this.onDeleteClicked } >
                        <i className="fas fa-ban" />
                    </button>
                    <div className="clock-master-option">
                        <label htmlFor="segmentsCount"># Segments</label>
                        <input type="number"
                               disabled={!this.state.opened}
                               name="segmentsCount" 
                               id={ `clock-${this.props.clockInfos._id}-segments-count` } 
                               value={clockInfos.segments}
                               onChange={ this.onClockSegmentsCountChangedInternal }
                               onBlur={ this.onClockSegmentsCountChanged }  />
                        </div>
                    <div className="clock-master-option">
                        <label htmlFor="colors">Color</label>
                        <select name="colors" 
                                disabled={!this.state.opened}
                                id={`clock-${clockInfos._id}-color`}
                                onChange={ this.onColorChanged }>
                                    {colors}
                        </select>
                    </div>
                </div>
                <button className="clock-toggle-settings-button"
                        onClick={ this.onToggleSettingsMenu }>
                    <i className="fas fa-cogs" />
                </button>
            </div>
        );
    }

    onToggleSettingsMenu = (e) => {
        this.setState({
            opened: !this.state.opened
        });
    }

    onDeleteClicked = () => {
        // TODO: We c(sh)ould prompt a confirmation window

        this.props.onDeleteClicked();
    }

    onClockSegmentsCountChangedInternal = (e) => {
        var value = e.target.value;

        if( isNaN( value ) && value !== "" )
        {
            return;
        }

        var clockInfos = this.state.clockInfos;
        clockInfos.segments = value;

        this.setState({
            dirty: true,
            clockInfos: clockInfos
        });
    }

    onClockSegmentsCountChanged = (e) => {
        var value = this.state.clockInfos.segments;

        if( isNaN( value ) && value !== "" )
        {
            return;
        }

        if(value <= 2 && value !== "")
        {
            value = 3;
        }

        this.props.onSegmentsCountChanged(value);
    }

    onColorChanged = (e) => {
        this.props.onColorChanged(e.target.value);
    }
}

export default ClockEdit;