import { useState } from "react";
import "./PhotoCard.css";

type PhotoCardProps = {
  title: string;
  author: string;
};

const PhotoCard = ({ title, author }: PhotoCardProps) => {
  const [isPhotoSaved, setIsPhotoSaved] = useState(false);

  const handleButton = () => {
    console.log("Favourite button clicked");
  };

  return (
    <div className="photo-card">
      <img src="https://picsum.photos/200/300" alt="photo" />
      <div className="card-details">
        <p className="photo-title">{title ? title : ""}</p>
        <div className="dividing-line"></div>
        <p className="author">{author ? author : "Unknown"}</p>
        <button onClick={handleButton} className="button">
          {isPhotoSaved ? "Remove" : "Favourite"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
