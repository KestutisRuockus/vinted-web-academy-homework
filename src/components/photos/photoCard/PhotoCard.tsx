import { useEffect, useState } from "react";
import "./PhotoCard.css";
import { PhotoCardProps } from "../../../types/types";
import SkeletonPhotoCard from "../../skeletonCard/SkeletonCard";
import { isFavorited, toggleFavourite } from "../../../utils/favouriteUtils";

const PhotoCard = ({ photo, onRemove, setModalData }: PhotoCardProps) => {
  const [isFavourited, setIsFavourited] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setIsFavourited(isFavorited(photo.id, "photo"));
    setLoading(false);
  }, [photo.id]);

  return (
    <div className="photo-card" onClick={() => setModalData(photo)}>
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
        <button
          onClick={(e) =>
            toggleFavourite(
              e,
              photo.id,
              photo.avg_color,
              "photo",
              isFavourited,
              setIsFavourited,
              onRemove
            )
          }
          className="button"
        >
          {isFavourited ? "Remove" : "Favourite"}
        </button>
      </div>
    </div>
  );
};

export default PhotoCard;
