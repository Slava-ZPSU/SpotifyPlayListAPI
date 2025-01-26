import React, { useState } from 'react';
import "./App.css";

import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";

import Spotify from "../util/Spotify.js";

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState("New Playlist");
    const [playlistTracks, setPlaylistTracks] = useState([]);

    const addTrack = (track) => {
        if (playlistTracks.find((savedTrack) => savedTrack.id === track.id)) {
            return;
        }

        setPlaylistTracks([...playlistTracks, track]);
    }

    const removeTrack = (track) => {
        setPlaylistTracks(playlistTracks.filter((savedTrack) => savedTrack.id !== track.id));
    }

    const updatePlaylistName = (name) => {
        setPlaylistName(name);
    }

    const savePlaylist = () => {
        const trackURIs = playlistTracks.map((track) => track.uri);
        Spotify.savePlaylist(playlistName, trackURIs);

        setPlaylistName("New Playlist");
        setPlaylistTracks([]);
    }

    const search = async (term) => {
        const rawResults = await Spotify.search(term);

        setSearchResults(rawResults);
    }

    return (
        <div>
            <h1>Ja<span className={"highlight"}>mmm</span>ing</h1>
            <div className={"App"}>
                <SearchBar onSearch={search} />

                <div className={"App-playlist"}>
                    <SearchResults searchResults={searchResults} onAdd={addTrack} />
                    <Playlist
                        playlistName={playlistName}
                        playlistTracks={playlistTracks}
                        onNameChanged={updatePlaylistName}
                        onRemove={removeTrack}
                        onSave={savePlaylist}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
