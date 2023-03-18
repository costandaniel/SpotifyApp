import { useEffect, useState } from "react";
import { accessToken, logout, getCurrentUserProfile } from "./spotify";
import { catchErrors } from "./utils";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import styled from "styled-components/macro";
import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Twinkle+Star&display=swap');
:root {
  --black:#000000;
  --green: #1db954;
  --white:#ffffff;
  --font:'Twinkle Star', cursive;
}
html {
  box-sizing: border-box;
}
*,
*::before,
*::after {
  box-sizing: inherit;
}
body{
  margin: 0;
  padding: 0;
  background-color: var(--black);
  color: var(--white);
}
`;

const StyledLogginButton = styled.a`
  background-color: var(--green);
  color: var(--white);
  padding: 10px 20px;
  margin: 20px auto;
  border-radius: 30px;
  display: inline-block;
`;

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
}

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      if (!accessToken) return;
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      console.log(data);
    };
    catchErrors(fetchData());
  }, []);
  return (
    <div className="App">
      <GlobalStyle />
      <header className="App-header">
        {!token ? (
          <StyledLogginButton href="http://localhost:3000/login">
            Log in to Spotify
          </StyledLogginButton>
        ) : (
          <Router>
            <ScrollToTop />
            <Switch>
              <Route path="/top-artists">
                <h1>Top Artists</h1>
              </Route>
              <Route path="/top-tracks">
                <h1>Top Tracks</h1>
              </Route>
              <Route path="/playlists/:id">
                <h1>Playlist</h1>
              </Route>
              <Route path="/playlists">
                <h1>Playlist</h1>
              </Route>
              <Route path="/">
                <button onClick={logout}>Logout</button>
                {profile && (
                  <div>
                    <h1>{profile.display_name}</h1>
                    <p>{profile.followers.total} Followers</p>
                    {profile.images.length && profile.images[0].url && (
                      <img src={profile.images[0].url} alt="profile"></img>
                    )}
                  </div>
                )}
              </Route>
            </Switch>
          </Router>
        )}
      </header>
    </div>
  );
}

export default App;
