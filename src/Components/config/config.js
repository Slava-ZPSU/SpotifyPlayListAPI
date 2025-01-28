const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const prodConfig = {
    CLIENT_ID: CLIENT_ID,
    REDIRECT_URI: "https://spoticcourseapi.surge.sh/",
}

const devConfig = {
    CLIENT_ID: CLIENT_ID,
    REDIRECT_URI: "http://localhost:3000/",
}

const config = process.env.NODE_ENV === "production" ? prodConfig : devConfig;

export default config;
