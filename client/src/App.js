import { useEffect, useState } from "react";
import { accessToken, logout } from "./spotify";
import "./App.css";

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(accessToken);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        {!token ? (
          <a className="App-link" href="http://localhost:3000/login">
            Log in to Spotify
          </a>
        ) : (
          <div>
            <h1>Logged in!</h1>
            <button onClick={logout}>Log Out</button>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
