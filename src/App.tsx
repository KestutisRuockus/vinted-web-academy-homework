import { useState } from "react";
import "./App.css";
import PhotosContainer from "./components/photos/photosContainer/PhotosContainer";
import AppLayout from "./layouts/AppLayout";
import FavouriteContainer from "./components/favourite/FavouriteContainer";
import { ActivePage } from "./types/types";

function App() {
  const [activePage, setActivePage] = useState<ActivePage>("photos");
  return (
    <AppLayout setActivePage={setActivePage}>
      {activePage === "photos" && <PhotosContainer />}
      {activePage === "favourite" && <FavouriteContainer />}
    </AppLayout>
  );
}

export default App;
