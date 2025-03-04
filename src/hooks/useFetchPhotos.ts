import { useCallback, useEffect, useState } from "react";
import { Photo } from "../types/photoTypes";

export const useFetchPhotos = ({ pageNumber }: { pageNumber: number }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

  const fetchPhotos = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=}`,
        {
          headers: {
            Authorization: API_KEY,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch photos");
      }

      const data = await response.json();
      setPhotos((prevPhotos) => [...prevPhotos, ...data.photos]);
    } catch (error) {
      console.error("Error fetching photos:", error);
    }
  }, [API_KEY, pageNumber]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos };
};
