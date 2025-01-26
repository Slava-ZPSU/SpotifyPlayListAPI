import React from "react";
import "./Track.css";

const Track = ({track, onAdd, onRemove, isRemoval}) => {
    const add = () => {
        onAdd(track);
    }

    const remove = () => {
        onRemove(track);
    }

    const getButtonAction = () => {
        let content = "";
        let action = null;

        if (isRemoval) {
            content = "-";
            action = remove;
        } else {
            content = "+";
            action = add;
        }

        return (<button className={"Track-action"} onClick={action}>{content}</button>);
    }

    return (
        <div className="Track">
            <div className="Track-information">
                <h3> { track.name } </h3>
                <p> { track.artist } | { track.album } </p>
            </div>

            {getButtonAction()}
        </div>
    );
};

export default Track;
