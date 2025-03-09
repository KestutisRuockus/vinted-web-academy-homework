import { useEffect, useState } from "react";
import { Photo, Video } from "../../types/types";
import { fetchPhotoById } from "../../utils/fetchPhotoById";
import PhotoCard from "../photos/photoCard/PhotoCard";
import VideoCard from "../videos/videoCard/VideoCard";
import { fetchVideoById } from "../../utils/fetchVideoById";

const FavouriteContainer = ({
  setModalData,
}: {
  setModalData: React.Dispatch<React.SetStateAction<Photo | Video | null>>;
}) => {
  const [favouritePhotos, setFavouritePhotos] = useState<Photo[] | []>([]);
  const [favouriteVideos, setFavouriteVideos] = useState<Video[] | []>([]);

  useEffect(() => {
    const photoFromLocalStorage = JSON.parse(
      localStorage.getItem("favourite-photos") || "[]"
    );

    const videosFromLocalStorage = JSON.parse(
      localStorage.getItem("favourite-videos") || "[]"
    );

    if (!photoFromLocalStorage.length) return;
    if (!videosFromLocalStorage.length) return;

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

    const fetchVideos = async () => {
      try {
        const fetchedVideos = await Promise.all(
          videosFromLocalStorage.map(async (video: { id: string }) => {
            const videoData = await fetchVideoById(Number(video.id));
            return videoData;
          })
        );
        setFavouriteVideos(fetchedVideos);
      } catch (error) {
        console.log("Failed to load videos." + error);
      }
    };

    fetchPhotos();
    fetchVideos();
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

  const handleUnfavouriteVideo = (videoId: number) => {
    const updatedVideos = favouriteVideos.filter(
      (video) => Number(video.id) !== videoId
    );
    setFavouriteVideos(updatedVideos);

    const saveOnlyIDsToLocalStorageList = updatedVideos.map((photo) => ({
      id: photo.id,
    }));
    localStorage.setItem(
      "favourite-videos",
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
          setModalData={setModalData}
        />
      ))}
      {favouriteVideos.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          onRemove={handleUnfavouriteVideo}
          setModalData={setModalData}
        />
      ))}
    </div>
  );
};

export default FavouriteContainer;
