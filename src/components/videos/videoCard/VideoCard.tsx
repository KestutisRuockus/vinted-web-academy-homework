import { useRef, useState } from "react";
import { Video } from "../../../types/types";
import "./videoCard.css";

const VideoCard = ({ video }: { video: Video }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
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

  return (
    <div className="video-card" onClick={handleClick}>
      <video
        ref={videoRef}
        autoPlay={false}
        loop={true}
        muted={false}
        controls={false}
      >
        <source
          src={video.video_files[0].link}
          type={video.video_files[0].file_type}
        />
      </video>
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
    </div>
  );
};

export default VideoCard;
