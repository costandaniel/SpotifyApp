import { useState, useEffect } from "react";
import { catchErrors } from "../utils";
import { getCurrentUserPlaylists } from "../spotify";
import { SectionWrapper, PlaylistsGrid } from "../components";

const Playlists = () => {
  const [playlists, setPlaylists] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const userPlaylists = await getCurrentUserPlaylists();
      setPlaylists(userPlaylists.data);
    };

    catchErrors(fetchData());
  }, []);
  return (
    <main>
      <SectionWrapper title="Playlists" breadcrumb="true">
        {playlists && playlists.items && (
          <PlaylistsGrid playlists={playlists.items} />
        )}
      </SectionWrapper>
    </main>
  );
};
export default Playlists;
