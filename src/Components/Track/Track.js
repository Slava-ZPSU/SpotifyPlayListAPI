import React, { Component } from "react";
import "./Track.css";

class Track extends Component
{
    constructor(props){
        super(props);

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.getButtonAction = this.getButtonAction.bind(this);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3> { this.props.track.name } </h3>
                    <p> { this.props.track.artist } | { this.props.track.album } </p>
                </div>
                {this.getButtonAction}
            </div>
        );
    }

    getButtonAction() {
        let content = "";
        let action = null;

        if (this.props.isRemoval) {
            action = this.removeTrack;
            content = "-";
        } else {
            action = this.addTrack;
            content = "+"
        }

        return (
            <button className="Track-action" onClick={action}>{content}</button>
        );
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }
}

export default Track;
