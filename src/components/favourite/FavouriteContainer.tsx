import { useEffect, useState } from "react";
import { Photo } from "../../types/types";
import { fetchPhotoById } from "../../utils/fetchPhotoById";
import PhotoCard from "../photos/photoCard/PhotoCard";

const FavouriteContainer = () => {
  const [favouritePhotos, setFavouritePhotos] = useState<Photo[] | []>([]);

  useEffect(() => {
    const photoFromLocalStorage = JSON.parse(
      localStorage.getItem("favourite-photos") || "[]"
    );

    if (!photoFromLocalStorage.length) return;

    const fetchPhotos = async () => {
      try {
        const fetchedPhotos = await Promise.all(
          photoFromLocalStorage.map(async (photo: { id: string }) => {
            const photoData = await fetchPhotoById(Number(photo.id));
            return photoData;
          })
        );
        setFavouritePhotos(fetchedPhotos);
      } catch (error) {
        console.log("Failed to load photos." + error);
      }
    };

    fetchPhotos();

    setFavouritePhotos(photoFromLocalStorage);
  }, []);

  const handleUnfavouritePhoto = (photoId: number) => {
    const updatedPhotos = favouritePhotos.filter(
      (photo) => Number(photo.id) !== photoId
    );
    setFavouritePhotos(updatedPhotos);

    const saveOnlyIDsToLocalStorageList = updatedPhotos.map((photo) => ({
      id: photo.id,
      avg_color: photo.avg_color,
    }));
    localStorage.setItem(
      "favourite-photos",
      JSON.stringify(saveOnlyIDsToLocalStorageList)
    );
  };

  return (
    <div className="container">
      {favouritePhotos.map((photo) => (
        <PhotoCard
          key={photo.id}
          photo={photo}
          onRemove={handleUnfavouritePhoto}
        />
      ))}
    </div>
  );
};

export default FavouriteContainer;
