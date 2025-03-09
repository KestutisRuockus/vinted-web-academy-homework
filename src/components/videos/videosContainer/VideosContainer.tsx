import "./VideosContainer.css";
import React, { useEffect, useState } from "react";
import { useFetchVidoes } from "../../../hooks/useFetchVideos";
import VideoCard from "../videoCard/VideoCard";
import { useElementOnScreen } from "../../../hooks/useElementOnScreen";
import SearchInput from "../../seacrh/SearchInput";
import { Photo, Video } from "../../../types/types";
import Modal from "../../modal/Modal";

const VideosContainer = ({
  query,
  setQuery,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [page, setPage] = useState(1);
  const [modalData, setModalData] = useState<Video | Photo | null>(null);
  const { videos, loading, hasMore } = useFetchVidoes({
    pageNumber: page,
    query,
  });
  const [laodMoreRef, isVisible] = useElementOnScreen({
    root: null,
    rootMargin: "0px",
    threshold: 0.2,
  });

  const closeModal = () => {
    setModalData(null);
  };

  useEffect(() => {
    setPage(1);
  }, [query]);

  useEffect(() => {
    if (isVisible && hasMore) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isVisible, hasMore]);

  useEffect(() => {
    if (modalData) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalData]);
  return (
    <>
      <SearchInput onSearch={setQuery} />
      <div className="container">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} setModalData={setModalData} />
        ))}
        {loading && <div>Loading...</div>}
        <div ref={laodMoreRef} style={{ marginBottom: "50px" }}></div>

        {modalData && <Modal data={modalData} onClose={closeModal} />}
      </div>
    </>
  );
};

export default VideosContainer;
