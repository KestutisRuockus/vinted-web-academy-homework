import { useEffect, useState } from "react";
import "./PhotoCard.css";
import { PhotoCardProps } from "../../../types/types";
import SkeletonPhotoCard from "../../skeletonCard/SkeletonCard";

const PhotoCard = ({ photo, onRemove }: PhotoCardProps) => {
  const [isFavourited, setIsFavourited] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadFromLocalStorage = () => {
    const favouritePhotos = JSON.parse(
      localStorage.getItem("favourite-photos") || "[]"
    );
    return favouritePhotos;
  };

  const saveToLocalStorage = () => {
    const photoObj = {
      id: photo.id,
      avg_color: photo.avg_color,
      type: "photo",
    };

    const favouritePhotos = loadFromLocalStorage();
    favouritePhotos.push(photoObj);

    localStorage.setItem("favourite-photos", JSON.stringify(favouritePhotos));
  };

  const removeFromLocalStorage = (photoId: number) => {
    const favouritePhotos = loadFromLocalStorage();
    const updatedPhotos = favouritePhotos.filter(
      (photo: { id: string }) => Number(photo.id) !== photoId
    );
    localStorage.setItem("favourite-photos", JSON.stringify(updatedPhotos));
  };

  const toggleFavourite = () => {
    if (isFavourited) {
      removeFromLocalStorage(photo.id);
      onRemove?.(photo.id);
    } else {
      saveToLocalStorage();
    }
    setIsFavourited(!isFavourited);
  };

  useEffect(() => {
    const favouritePhotos = loadFromLocalStorage();
    if (
      favouritePhotos.some(
        (favPhoto: { id: string }) => Number(favPhoto.id) === photo.id
      )
    ) {
      setIsFavourited(true);
    }
    setLoading(false);
  }, [photo.id]);

  return (
    <div className="photo-card">
      {loading && <SkeletonPhotoCard />}
      <img
        src={photo.src?.original || ""}
        alt={photo.alt || "photo"}
        loading="lazy"
        srcSet={`${photo.src?.landscape} 1200w, ${photo.src?.large} 600w, ${photo.src?.small} 360w`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        onLoad={() => setLoading(false)}
        style={{ backgroundColor: photo.avg_color }}
      />
      <div className="card-details">
        <p className="photo-title">{photo.alt || ""}</p>
        <div className="dividing-line"></div>
        <p className="author">{photo.photographer || "Unknown"}</p>
        <button onClick={toggleFavourite} className="button">
          {isFavourited ? "Remove" : "Favourite"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
