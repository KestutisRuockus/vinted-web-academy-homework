import "./VideosContainer.css";
import { useEffect, useState } from "react";
import { useFetchVidoes } from "../../../hooks/useFetchVideos";
import VideoCard from "../videoCard/VideoCard";
import { useElementOnScreen } from "../../../hooks/useElementOnScreen";

const VideosContainer = () => {
  const [page, setPage] = useState(1);
  const { videos, loading } = useFetchVidoes({ pageNumber: page });
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
      {videos.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
      {loading && <div>Loading...</div>}
      <div ref={laodMoreRef}></div>
    </div>
  );
};

export default VideosContainer;
