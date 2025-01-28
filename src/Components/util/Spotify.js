import config from "../config/config";

let ACCESS_TOKEN;

const mapTrackData = (track) => ({
    id: track.id,
    name: track.name,
    artist: track.artists[0]?.name,
    album: track.album?.name,
    uri: track.uri,
});

const extractTokenFromUrl = () => {
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (accessTokenMatch && expiresInMatch) {
    ACCESS_TOKEN = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);

    window.setTimeout(() => (ACCESS_TOKEN = ""), expiresIn * 1000);
    window.history.pushState("Access Token", null, "/");
    return ACCESS_TOKEN;
  }
};

export const getAccessToken = async () => {
  if (ACCESS_TOKEN) return ACCESS_TOKEN;

  const token = extractTokenFromUrl();
  if (token) return token;

  const scope = [
    "playlist-modify-public",    // Дозволяє створювати/змінювати публічні плейлисти
    "user-read-playback-state",  // Читання стану плеєра
    "user-modify-playback-state",// Зміна стану плеєра (play/pause/skip)
    "user-read-currently-playing", // Отримання інформації про поточний трек
    "streaming"                  // Потрібно для програвання треків через Web Playback SDK
  ].join(" ");

  const accessUrl = `https://accounts.spotify.com/authorize?client_id=${config.CLIENT_ID}&response_type=token&scope=${encodeURIComponent(
    scope
  )}&redirect_uri=${config.REDIRECT_URI}`;

  window.location = accessUrl; // Перенаправляє користувача на авторизацію
};

export const connectToSpotify = async () => {
  try {
    const token = await getAccessToken();
    if (token) {
      console.log("Connected to Spotify!");
      return true;
    }
  } catch (error) {
    console.error("Failed to connect to Spotify:", error);
  }
};

export const searchInSpotify = async (term) => {
  try {
    const token = await getAccessToken();
    const response = await fetchWithToken(`https://api.spotify.com/v1/search?type=track&q=${term}`, token);
    const jsonResponse = await response.json();
    return jsonResponse?.tracks?.items?.map(mapTrackData) || [];
  } catch (error) {
    console.error("Failed to search tracks:", error);
    return [];
  }
};


const fetchWithToken = async (url, token, options = {}) => {
  const headers = {
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  if (!response.ok) {
    throw new Error(`Failed request to ${url}`);
  }

  return response;
};


export const savePlaylistToSpotify = async (playlistName, trackURIs) => {
  if (!playlistName || !trackURIs?.length) return;

  try {
    const token = await getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };

    const userId = await fetchUserId(headers);
    const playlistId = await createPlaylist(userId, playlistName, headers);
    await addTracksToPlaylist(playlistId, trackURIs, headers);

    console.log("Playlist saved successfully!");
  } catch (error) {
    console.error("Failed to save playlist:", error);
  }
};

const fetchUserId = async (headers) => {
  const response = await fetchWithToken("https://api.spotify.com/v1/me", null, { headers });
  const jsonResponse = await response.json();
  return jsonResponse.id;
};

const createPlaylist = async (userId, playlistName, headers) => {
  const response = await fetchWithToken(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    null,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ name: playlistName, public: true }),
    }
  );

  const jsonResponse = await response.json();
  return jsonResponse.id;
};

const addTracksToPlaylist = async (playlistId, trackURIs, headers) => {
  await fetchWithToken(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    null,
    {
      method: "POST",
      headers,
      body: JSON.stringify({ uris: trackURIs, position: 0 }),
    }
  );
};
