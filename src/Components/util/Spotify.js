const Spotify = {};

let ACCESS_TOKEN;

const CLIENT_ID = "d634d060b82d4318948d93b06ddc2d5a";
//const REDIRECT_URI = "http://spoticcourseapi.surge.sh/";

const REDIRECT_URI = "http://localhost:3000/";

Spotify.getAccessToken = function () {
  if (ACCESS_TOKEN) {
    return ACCESS_TOKEN;
  }

  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (accessTokenMatch && expiresInMatch) {
    ACCESS_TOKEN = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);

    window.setTimeout(() => (ACCESS_TOKEN = ""), expiresIn * 1000);
    window.history.pushState("Access Token", null, "/");

    return ACCESS_TOKEN;
  }

  if (!ACCESS_TOKEN) {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    window.location = accessUrl;
  }
};

Spotify.search = async function (term) {
    const token = await Spotify.getAccessToken();
    if (!token) {
        throw new Error("Access token is missing!");
    }

    try {
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if(!response.ok) {
            throw new Error("Failed to fetch tracks.");
        }

        const jsonResponse = await response.json();
        if(!jsonResponse) {
            return [];
        }

        return jsonResponse.tracks.items.map(track => {
            return {
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri,
            }
        });
    } catch (error) {
        console.error(error);
        return [];
    }
};

Spotify.savePlaylist = async function (playlistName, trackURIs) {
    if (!playlistName || !trackURIs) {
        return;
    }

    let token = await Spotify.getAccessToken();
    let headers = {
        Authorization: `Bearer ${token}`,
    };
    let userId = null;

    try {
        let response = await fetch(`https://api.spotify.com/v1/me`, { headers: headers });
        if (!response.ok) {
            throw new Error("Failed to fetch user ID");
        }

        let jsonResponse = await response.json();

        userId = jsonResponse.id;

        response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify({
                name: playlistName,
                public: true, // Плейлист буде публічним
            }),
        });

        if (!response.ok) {
            throw new Error("Failed to create playlist.");
        }

        jsonResponse = await response.json();
        const playlistId = jsonResponse.id;

        response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify ({
                uris: trackURIs,
                position: 0,
            }),
        });

        if (!response) {
            throw new Error("Failed fill playlist with tracks");
        }
    } catch (error) {
        console.error(error);
    }
}

export default Spotify;

