import { useState } from "react";
import "./App.css";
import PhotosContainer from "./components/photos/photosContainer/PhotosContainer";
import AppLayout from "./layouts/AppLayout";
import FavouriteContainer from "./components/favourite/FavouriteContainer";
import { ActivePage } from "./types/types";
import VideosContainer from "./components/videos/videosContainer/VideosContainer";

function App() {
  const [activePage, setActivePage] = useState<ActivePage>("photos");
  const [query, setQuery] = useState<string>("");

  const resetQuery = () => {
    setQuery("");
  };

  return (
    <AppLayout
      activePage={activePage}
      setActivePage={setActivePage}
      resetQuery={resetQuery}
    >
      {activePage === "photos" && (
        <PhotosContainer query={query} setQuery={setQuery} />
      )}
      {activePage === "videos" && (
        <VideosContainer query={query} setQuery={setQuery} />
      )}
      {activePage === "favourite" && <FavouriteContainer />}
    </AppLayout>
  );
}

export default App;
