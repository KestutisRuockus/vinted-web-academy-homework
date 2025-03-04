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
      <img src={photo.src?.original} alt="photo" />
      <div className="card-details">
        <p className="photo-title">{photo.alt ? photo.alt : ""}</p>
        <div className="dividing-line"></div>
        <p className="author">
          {photo.photographer ? photo.photographer : "Unknown"}
        </p>
        <button onClick={handleButton} className="button">
          {isPhotoSaved ? "Remove" : "Favourite"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
