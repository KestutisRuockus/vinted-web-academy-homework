import { useCallback, useEffect, useState } from "react";
import { Photo } from "../types/types";

export const useFetchPhotos = ({ pageNumber }: { pageNumber: number }) => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  const itemsPerpage = 10;

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.pexels.com/v1/curated?page=${pageNumber}&per_page=${itemsPerpage}}`,
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
    } finally {
      setLoading(false);
    }
  }, [API_KEY, pageNumber]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading };
};
