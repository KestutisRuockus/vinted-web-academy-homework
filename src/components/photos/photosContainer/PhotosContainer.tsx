import "./photosContainer.css";
import PhotoCard from "../photoCard/PhotoCard";
import { useFetchPhotos } from "../../../hooks/useFetchPhotos";
import { useEffect, useState } from "react";
import { useElementOnScreen } from "../../../hooks/useElementOnScreen";
import SearchInput from "../../seacrh/SearchInput";
import { Photo, Video } from "../../../types/types";

const PhotosContainer = ({
  query,
  setQuery,
  setModalData,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setModalData: React.Dispatch<React.SetStateAction<Photo | Video | null>>;
}) => {
  const [page, setPage] = useState(1);
  const { photos, loading, hasMore } = useFetchPhotos({
    pageNumber: page,
    query,
  });

  const [laodMoreRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (isVisible && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isVisible, hasMore]);

  return (
    <>
      <SearchInput onSearch={setQuery} />
      <div className="container">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} setModalData={setModalData} />
        ))}
        {loading && <div>Loading...</div>}
        <div ref={laodMoreRef} style={{ marginBottom: "50px" }}></div>
      </div>
    </>
  );
};

export default PhotosContainer;
