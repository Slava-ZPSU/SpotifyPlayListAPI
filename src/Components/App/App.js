import React, { useState, useEffect } from 'react';
import "./App.css";

import SearchBar from "../SearchBar/SearchBar.js";
import SearchResults from "../SearchResults/SearchResults.js";
import Playlist from "../Playlist/Playlist.js";
import Player from "../Player/Player.js";
import { PlayerProvider } from "../../Context/PlayerContext.js";

import { connectToSpotify, searchInSpotify, savePlaylistToSpotify } from "../util/Spotify.js";

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [playlistName, setPlaylistName] = useState("New Playlist");
    const [playlistTracks, setPlaylistTracks] = useState([]);

    useEffect(() => {
        connectToSpotify();
    });

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
        savePlaylistToSpotify(playlistName, trackURIs);

        setPlaylistName("New Playlist");
        setPlaylistTracks([]);
    }

    const search = async (term) => {
        const rawResults = await searchInSpotify(term);

        setSearchResults(rawResults);
    }

    return (
        <div>
            <h1>Ja<span className={"highlight"}>mmm</span>ing</h1>
            <div className={"App"}>
                <SearchBar onSearch={search} />

            <PlayerProvider>
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
                <Player />
            </PlayerProvider>
            </div>
        </div>
    );
};

export default App;
