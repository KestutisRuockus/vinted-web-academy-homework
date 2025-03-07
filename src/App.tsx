import { useState } from "react";
import "./App.css";
import PhotosContainer from "./components/photos/photosContainer/PhotosContainer";
import AppLayout from "./layouts/AppLayout";
import FavouriteContainer from "./components/favourite/FavouriteContainer";
import { ActivePage } from "./types/types";
import VideosContainer from "./components/videos/videosContainer/VideosContainer";

function App() {
  const [activePage, setActivePage] = useState<ActivePage>("photos");
  return (
    <AppLayout setActivePage={setActivePage}>
      {activePage === "photos" && <PhotosContainer />}
      {activePage === "favourite" && <FavouriteContainer />}
      {activePage === "videos" && <VideosContainer />}
    </AppLayout>
  );
}

export default App;
