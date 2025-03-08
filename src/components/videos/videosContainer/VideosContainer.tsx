import "./VideosContainer.css";
import React, { useEffect, useState } from "react";
import { useFetchVidoes } from "../../../hooks/useFetchVideos";
import VideoCard from "../videoCard/VideoCard";
import { useElementOnScreen } from "../../../hooks/useElementOnScreen";
import SearchInput from "../../seacrh/SearchInput";

const VideosContainer = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
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
          <VideoCard key={video.id} video={video} />
        ))}
        {loading && <div>Loading...</div>}
        <div ref={laodMoreRef}></div>
      </div>
    </>
  );
};

export default VideosContainer;
