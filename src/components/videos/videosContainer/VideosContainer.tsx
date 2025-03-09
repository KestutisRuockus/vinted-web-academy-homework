import "./VideosContainer.css";
import React, { useEffect, useState } from "react";
import { useFetchVidoes } from "../../../hooks/useFetchVideos";
import VideoCard from "../videoCard/VideoCard";
import { useElementOnScreen } from "../../../hooks/useElementOnScreen";
import SearchInput from "../../seacrh/SearchInput";
import { Photo, Video } from "../../../types/types";

const VideosContainer = ({
  query,
  setQuery,
  setModalData,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setModalData: React.Dispatch<React.SetStateAction<Photo | Video | null>>;
}) => {
  const [page, setPage] = useState(1);
  const { videos, loading, hasMore } = useFetchVidoes({
    pageNumber: page,
    query,
  });
  const [laodMoreRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (isVisible && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isVisible, hasMore]);
  return (
    <>
      <SearchInput onSearch={setQuery} />
      <div className="container">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} setModalData={setModalData} />
        ))}
        {loading && <div>Loading...</div>}
        <div ref={laodMoreRef} style={{ marginBottom: "50px" }}></div>
      </div>
    </>
  );
};

export default VideosContainer;
