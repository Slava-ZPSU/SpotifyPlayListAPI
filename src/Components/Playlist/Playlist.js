import React, { Component } from "react";
import "./Playlist.css";
import TrackList from "../TrackList/TrackList.js";

class Playlist extends Component
{
    constructor(props) {
        super(props);

        this.handleNameChange = this.handleNameChange.bind(this);
    }

    render() {
        return (
            <div className="Playlist">
                <input value={this.props.playlistName} onChange={this.handleNameChange}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true}/>
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }

    handleNameChange(event) {
        let newPlaylistName = event.target.value;
        this.props.onNameChanged(newPlaylistName)
    }
}

export default Playlist;
