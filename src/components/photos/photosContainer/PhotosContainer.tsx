import "./photosContainer.css";
import PhotoCard from "../photoCard/PhotoCard";
import { useFetchPhotos } from "../../../hooks/useFetchPhotos";
import { useEffect, useState } from "react";
import { useElementOnScreen } from "../../../hooks/useElementOnScreen";

const PhotosContainer = () => {
  const [page, setPage] = useState(1);
  const { photos, loading } = useFetchPhotos({ pageNumber: page });

  const [laodMoreRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  useEffect(() => {
    if (isVisible) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isVisible]);

  return (
    <div className="container">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
      {loading && <div>Loading...</div>}
      <div ref={laodMoreRef}></div>
    </div>
  );
};

export default PhotosContainer;
