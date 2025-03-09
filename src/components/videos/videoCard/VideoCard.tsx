import { useEffect, useRef, useState } from "react";
import { VideoCardProps } from "../../../types/types";
import "./videoCard.css";
import SkeletonPhotoCard from "../../skeletonCard/SkeletonCard";

const VideoCard = ({ video, onRemove, setModalData }: VideoCardProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavourited, setIsFavourited] = useState(false);
  const [loading, setLoading] = useState(true);

  const handlePlayPauseClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const loadFromLocalStorage = () => {
    const favouritePhotos = JSON.parse(
      localStorage.getItem("favourite-videos") || "[]"
    );
    return favouritePhotos;
  };

  const saveToLocalStorage = () => {
    const videoObj = {
      id: video.id,
    };

    const favouriteVideos = loadFromLocalStorage();
    favouriteVideos.push(videoObj);

    localStorage.setItem("favourite-videos", JSON.stringify(favouriteVideos));
  };

  const removeFromLocalStorage = (videoId: number) => {
    const favouriteVideos = loadFromLocalStorage();
    const updatedVideos = favouriteVideos.filter(
      (video: { id: string }) => Number(video.id) !== videoId
    );
    localStorage.setItem("favourite-videos", JSON.stringify(updatedVideos));
  };

  const toggleFavourite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    if (isFavourited) {
      removeFromLocalStorage(video.id);
      onRemove?.(video.id);
    } else {
      saveToLocalStorage();
    }
    setIsFavourited(!isFavourited);
  };

  useEffect(() => {
    const favouriteVideos = loadFromLocalStorage();
    if (
      favouriteVideos.some(
        (favVideo: { id: string }) => Number(favVideo.id) === video.id
      )
    ) {
      setIsFavourited(true);
    }
    setLoading(false);
  }, [video.id]);

  return (
    <div className="video-card" onClick={handlePlayPauseClick}>
      {loading && <SkeletonPhotoCard />}
      <video
        preload="none"
        ref={videoRef}
        autoPlay={false}
        loop={true}
        muted={false}
        controls={false}
        poster={video.image}
      >
        <source
          src={video.video_files[0].link}
          type={video.video_files[0].file_type}
        />
      </video>
      {!loading && (
        <div className="play-button">
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <rect x="5" y="3" width="4" height="18" />
              <rect x="15" y="3" width="4" height="18" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <polygon points="5,3 19,12 5,21" />
            </svg>
          )}
        </div>
      )}
      <div className="video-buttons">
        <button onClick={toggleFavourite} className="video-favourite-button">
          {isFavourited ? "Remove" : "Favourite"}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setModalData(video);
          }}
          className="video-view-button"
        >
          Expand
        </button>
      </div>
    </div>
  );
};

export default VideoCard;
