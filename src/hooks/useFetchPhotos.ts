import { useCallback, useEffect, useState } from "react";
import { Photo } from "../types/types";

export const useFetchPhotos = ({
  pageNumber,
  query,
}: {
  pageNumber: number;
  query: string;
}) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  const itemsPerpage = 10;

  const fetchPhotos = useCallback(async () => {
    if (!hasMore) {
      return;
    }

    setLoading(true);
    try {
      const url = query
        ? `https://api.pexels.com/v1/search?page=${pageNumber}&per_page=${itemsPerpage}&query=${query}`
        : `https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=${itemsPerpage}`;

      const response = await fetch(url, {
        headers: {
          Authorization: API_KEY,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }

      const data = await response.json();

      if (pageNumber === 1) {
        setPhotos(data.photos);
      } else {
        setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
      }

      if (data.photos.length < itemsPerpage) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  }, [hasMore, query, pageNumber, API_KEY]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading, hasMore };
};
