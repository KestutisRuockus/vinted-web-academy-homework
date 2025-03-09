import "./photosContainer.css";
import PhotoCard from "../photoCard/PhotoCard";
import { useFetchPhotos } from "../../../hooks/useFetchPhotos";
import { useEffect, useState } from "react";
import { useElementOnScreen } from "../../../hooks/useElementOnScreen";
import SearchInput from "../../seacrh/SearchInput";
import Modal from "../../modal/Modal";
import { Photo, Video } from "../../../types/types";

const PhotosContainer = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState<Photo | Video | null>(null);
  const { photos, loading, hasMore } = useFetchPhotos({
    pageNumber: page,
    query,
  });

  const [laodMoreRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const closeModal = () => {
    setModalData(null);
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (isVisible && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isVisible, hasMore]);

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
    <>
      <SearchInput onSearch={setQuery} />
      <div className="container">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} setModalData={setModalData} />
        ))}
        {loading && <div>Loading...</div>}
        <div ref={laodMoreRef}></div>

        {modalData && <Modal data={modalData} onClose={closeModal} />}
      </div>
    </>
  );
};

export default PhotosContainer;
