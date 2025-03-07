import { useCallback, useEffect, useState } from "react";
import { Video } from "../types/types";

export const useFetchVidoes = ({ pageNumber }: { pageNumber: number }) => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  const itemsPerpage = 10;

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.pexels.com/videos/popular?page=${pageNumber}&per_page=${itemsPerpage}}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch videos");
      }

      const data = await response.json();
      setVideos((prevVideos) => [...prevVideos, ...data.videos]);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, pageNumber]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, loading };
};
