import React from 'react';

/// Props
/// - clockInfos
/// - onSegmentsCountChanged
/// - onColorChanged
/// - onDeleteClicked
/// - onClockMove
/// - isLast
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
                                value={this.state.clockInfos.color}
                                disabled={!this.state.opened}
                                id={`clock-${clockInfos._id}-color`}
                                onChange={ this.onColorChanged }>
                                    {colors}
                        </select>
                    </div>
                    <div className="clock-master-option">
                        <label htmlFor="colors">Move Clock</label>
                        <div className="clock-settings-move-wrapper">
                            <div className="clock-settings-move-item">
                                { this.state.clockInfos.order > 0 &&
                                <button name="clock-move-left" 
                                        onClick={ this.onMoveLeft }
                                        className="clock-move"
                                        disabled={!this.state.opened}>
                                    <i className="fas fa-arrow-alt-circle-left" />
                                </button>
                                }
                            </div>
                            <div className="clock-settings-move-item">
                                { !this.props.isLast &&
                                <button name="clock-move-right"
                                        onClick={ this.onMoveRight }
                                        className="clock-move" 
                                        disabled={!this.state.opened}>
                                    <i className="fas fa-arrow-alt-circle-right" />
                                </button>
                                }
                            </div>
                        </div>
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

        if(value <= 2 || value === "")
        {
            value = 2;
        }

        this.props.onSegmentsCountChanged(value);
    }

    onColorChanged = (e) => {
        var value =  e.target.value;;
        var clockInfos = this.state.clockInfos;
        clockInfos.color = value;
        
        this.setState({
            clockInfos: clockInfos
        });
        this.props.onColorChanged(value);
    }

    onMoveRight = (e) => {
        this.setState({opened: false});
        this.props.onClockMove(1);
    }

    onMoveLeft = (e) => {
        this.setState({opened: false});
        this.props.onClockMove(-1);
    }
}

export default ClockEdit;