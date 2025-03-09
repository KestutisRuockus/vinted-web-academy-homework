import { useEffect, useState } from "react";
import { ModalProps, Photo, Video } from "../../types/types";
import "./modal.css";
import { isFavorited, toggleFavourite } from "../../utils/favouriteUtils";

const isPhoto = (data: Photo | Video): data is Photo => {
  return (data as Photo).src !== undefined;
};

const isVideo = (data: Photo | Video): data is Video => {
  return (data as Video).video_files !== undefined;
};

const PhotoModal = ({ data, onClose }: ModalProps) => {
  const [isFavourited, setIsFavourited] = useState(false);

  const handleFavouriteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    toggleFavourite(
      e,
      data.id,
      isPhoto(data) ? data.avg_color : undefined,
      "photo",
      isFavourited,
      setIsFavourited
    );
  };

  useEffect(() => {
    setIsFavourited(isFavorited(data.id, "photo"));
  }, [data.id]);

  if (!isPhoto(data)) return null;
  return (
    <>
      <img
        src={data.src?.original}
        alt={data.alt}
        className="modal-image"
        srcSet={`
          ${data.src?.small} 360w,
          ${data.src?.large} 600w,
          ${data.src?.landscape} 1200w,
          ${data.src?.original} 2000w
        `}
        sizes="(max-width: 480px) 90vw, 
               (max-width: 768px) 80vw, 
               (max-width: 1024px) 70vw, 
               60vw"
      />
      <div className="modal-details">
        <h2>{data.photographer || "Unknown Photographer"}</h2>
        <p>{data.alt || "No description available"}</p>
        <div className="modal-buttons">
          <button onClick={handleFavouriteClick}>
            {isFavourited ? "Remove" : "Favourite"}
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

const VideoModal = ({ data, onClose }: ModalProps) => {
  const [isFavourited, setIsFavourited] = useState(false);

  const handleFavouriteClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    toggleFavourite(
      e,
      data.id,
      undefined,
      "video",
      isFavourited,
      setIsFavourited
    );
  };

  useEffect(() => {
    setIsFavourited(isFavorited(data.id, "photo"));
  }, [data.id]);

  if (!isVideo(data)) return null;
  return (
    <>
      <div className="modal-video-card">
        <h3>{data.user.name}</h3>
        <video
          preload="none"
          autoPlay={true}
          loop={true}
          muted={false}
          controls={true}
        >
          <source
            src={data.video_files[0].link}
            type={data.video_files[0].file_type}
          />
        </video>
      </div>
      <div className="modal-details">
        <div className="modal-buttons">
          <button onClick={handleFavouriteClick}>
            {isFavourited ? "Remove" : "Favourite"}
          </button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>
  );
};

const Modal = ({ data, onClose }: ModalProps) => {
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-body">
          {isPhoto(data) && <PhotoModal data={data} onClose={onClose} />}
          {isVideo(data) && <VideoModal data={data} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
};

export default Modal;
