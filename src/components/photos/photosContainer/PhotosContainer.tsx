import PhotoCard from "../photoCard/PhotoCard";
import "./photosContainer.css";

const PhotosContainer = () => {
  return (
    <div className="container">
      <PhotoCard title="Title" author="Author" />
      <PhotoCard
        title="Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur."
        author="Tom Tommity"
      />
      <PhotoCard title="" author="" />
    </div>
  );
};

export default PhotosContainer;
