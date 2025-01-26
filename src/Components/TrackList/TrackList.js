import React from "react";
import "./TrackList.css";
import Track from "../Track/Track.js";

const TrackList = ({tracks, onAdd, onRemove, isRemoval}) => {
    return (
        <div className="TrackList">
            {(Array.isArray(tracks) ? tracks : []).map((track) => (
                <Track track={track} onAdd={onAdd} onRemove={onRemove} isRemoval={isRemoval}/>
            ))}
        </div>
    );
}

export default TrackList;
