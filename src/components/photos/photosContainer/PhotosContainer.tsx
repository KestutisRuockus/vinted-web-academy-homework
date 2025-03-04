import "./photosContainer.css";
import PhotoCard from "../photoCard/PhotoCard";
import { useFetchPhotos } from "../../../hooks/useFetchPhotos";
import { useState } from "react";

const PhotosContainer = () => {
  const [page] = useState(1);
  const { photos } = useFetchPhotos({ pageNumber: page });

  return (
    <div className="container">
      {photos.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </div>
  );
};

export default PhotosContainer;
