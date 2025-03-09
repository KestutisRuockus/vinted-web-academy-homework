import { useEffect, useState } from "react";
import "./App.css";
import PhotosContainer from "./components/photos/photosContainer/PhotosContainer";
import AppLayout from "./layouts/AppLayout";
import FavouriteContainer from "./components/favourite/FavouriteContainer";
import { ActivePage, Photo, Video } from "./types/types";
import VideosContainer from "./components/videos/videosContainer/VideosContainer";
import Modal from "./components/modal/Modal";

function App() {
  const [activePage, setActivePage] = useState<ActivePage>("photos");
  const [query, setQuery] = useState<string>("");
  const [modalData, setModalData] = useState<Photo | Video | null>(null);

  const resetQuery = () => {
    setQuery("");
  };

  const closeModal = () => {
    setModalData(null);
  };

  useEffect(() => {
    if (modalData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalData]);

  return (
    <AppLayout
      activePage={activePage}
      setActivePage={setActivePage}
      resetQuery={resetQuery}
    >
      {activePage === "photos" && (
        <PhotosContainer
          query={query}
          setQuery={setQuery}
          setModalData={setModalData}
        />
      )}
      {activePage === "videos" && (
        <VideosContainer
          query={query}
          setQuery={setQuery}
          setModalData={setModalData}
        />
      )}
      {activePage === "favourite" && (
        <FavouriteContainer setModalData={setModalData} />
      )}
      {modalData && <Modal data={modalData} onClose={closeModal} />}
    </AppLayout>
  );
}

export default App;
