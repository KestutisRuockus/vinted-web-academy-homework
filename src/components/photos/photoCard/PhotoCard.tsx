import { useState } from "react";
import "./PhotoCard.css";
import { PhotoCardProps } from "../../../types/photoTypes";

const PhotoCard = ({ photo }: PhotoCardProps) => {
  const [isPhotoSaved] = useState(false);

  const handleButton = () => {
    console.log("Favourite button clicked");
  };

  return (
    <div className="photo-card">
      <img
        src={photo.src.original}
        alt={photo.alt || "photo"}
        loading="lazy"
        srcSet={`${photo.src?.landscape} 1200w, ${photo.src.large} 600w, ${photo.src.small} 360w`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
      <div className="card-details">
        <p className="photo-title">{photo.alt || ""}</p>
        <div className="dividing-line"></div>
        <p className="author">{photo.photographer || "Unknown"}</p>
        <button onClick={handleButton} className="button">
          {isPhotoSaved ? "Remove" : "Favourite"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
