import { useState, useEffect } from "react";
import { getTopArtists } from "../spotify";
import { catchErrors } from "../utils";
import {
  SectionWrapper,
  ArtistsGrid,
  TimeRangeButton,
  Loader,
} from "../components";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState(null);
  const [activeRange, setActiveRange] = useState("short");

  useEffect(() => {
    const fetchData = async () => {
      const userTopArtists = await getTopArtists(`${activeRange}_term`);
      setTopArtists(userTopArtists.data);
    };
    catchErrors(fetchData());
  }, [activeRange]);

  return (
    <main>
      {topArtists ? (
        <SectionWrapper title="Top artists" breadcrumb="true">
          <TimeRangeButton
            activeRange={activeRange}
            setActiveRange={setActiveRange}
          />
          <ArtistsGrid artists={topArtists.items.slice(0, 15)} />
        </SectionWrapper>
      ) : (
        <Loader />
      )}
    </main>
  );
};
export default TopArtists;
