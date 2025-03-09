export type ActivePage = "photos" | "favourite" | "videos";

export type Photo = {
  id: number;
  url?: string;
  photographer: string;
  photographer_url?: string;
  photographer_id?: number;
  avg_color: string;
  src?: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
};

export type PhotoCardProps = {
  photo: Photo;
  onRemove?: (id: number) => void;
  setModalData: React.Dispatch<React.SetStateAction<Photo | Video | null>>;
};

export type Video = {
  id: number;
  duration: number;
  image: string;
  video_files: VideoFiles[];
  video_pictures: VideoPictures[];
  user: {
    name: string;
  };
};

export type VideoCardProps = {
  video: Video;
  onRemove?: (id: number) => void;
  setModalData: React.Dispatch<React.SetStateAction<Video | Photo | null>>;
};

type VideoFiles = {
  id: number;
  link: string;
  file_type: string;
  width: number;
};

type VideoPictures = {
  id: number;
  nr: number;
  picture: string;
};

export type SearchInputProps = {
  onSearch: (query: string) => void;
};

export type ModalProps = {
  data: Photo | Video;
  onClose: () => void;
};
