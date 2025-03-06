import "./App.css";
import PhotosContainer from "./components/photos/photosContainer/PhotosContainer";
import AppLayout from "./layouts/AppLayout";

function App() {
  return (
    <AppLayout>
      <PhotosContainer />
    </AppLayout>
  );
}

export default App;
