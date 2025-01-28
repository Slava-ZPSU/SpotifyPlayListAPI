import { createContext, useContext, useState } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const [playedTrackURI, setPlayedTrackURI] = useState([]);

    const playTrack = (uri) => {
        setPlayedTrackURI(uri);
    };

    return (
        <PlayerContext.Provider value={{ playedTrackURI, playTrack }}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => {
    return useContext(PlayerContext);
}
