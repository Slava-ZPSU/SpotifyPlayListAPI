import React from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList.js";

const Playlist = ({playlistName, playlistTracks, onRemove, onSave, onNameChanged}) => {
    const handlePlaylistNameChange = (event) => {
        let newName = event.target.value;
        onNameChanged(newName);
    }

    return(
        <div className={"Playlist"}>
            <input value={playlistName} onChange={handlePlaylistNameChange} />
            <TrackList tracks={playlistTracks} onRemove={onRemove} isRemoval={true} />
            <button className={"Playlist-save"} onClick={onSave}>SAVE TO SPOTIFY</button>
        </div>
    );
};

export default Playlist;
