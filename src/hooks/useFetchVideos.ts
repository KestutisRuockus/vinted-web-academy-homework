import { useCallback, useEffect, useState } from "react";
import { Video } from "../types/types";

export const useFetchVidoes = ({
  pageNumber,
  query,
}: {
  pageNumber: number;
  query: string;
}) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  const itemsPerpage = 10;

  const fetchVideos = useCallback(async () => {
    if (!hasMore) {
      return;
    }

    setLoading(true);
    try {
      const url = query
        ? `https://api.pexels.com/videos/search?query=${query}&page=${pageNumber}&per_page=${itemsPerpage}}`
        : `https://api.pexels.com/videos/popular?page=${pageNumber}&per_page=${itemsPerpage}}`;
      const response = await fetch(url, {
        headers: {
          Authorization: API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await response.json();
      if (pageNumber === 1) {
        setVideos(data.videos);
      } else {
        setVideos((pervVideos) => [...pervVideos, ...data.videos]);
      }

      if (data.videos.length < itemsPerpage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, hasMore, pageNumber, query]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, loading, hasMore };
};
