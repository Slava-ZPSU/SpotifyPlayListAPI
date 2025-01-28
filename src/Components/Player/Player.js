import React, { useState, useEffect } from "react";
import SpotifyPlayer from "react-spotify-web-playback";

import { usePlayer } from "../../Context/PlayerContext";
import { getAccessToken } from "../util/Spotify.js";


const Player = () => {
    const { playedTrackURI } = usePlayer();
    const [accessToken, setAccessToken] = useState(null);

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await getAccessToken();
                setAccessToken(token);
            } catch (error) {
                console.error("Failed to fetch access token: ", error);
            }
        };

        fetchToken();
    }, []);

    if (!accessToken) {
        return <div>Loading Player...</div>;
    }

    return (
        <SpotifyPlayer
            token={accessToken}
            uris={playedTrackURI ? [playedTrackURI] : []}
            play={!!playedTrackURI.length}
            styles={{
                activeColor: "#1db954",
                bgColor: "#282828",
                color: "#ffffff",
            }}
        />
    );
};

export default Player;
