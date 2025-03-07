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
};

export type Video = {
  id: number;
  duration: number;
  image: string;
  video_files: VideoFiles[];
  video_pictures: VideoPictures;
};

type VideoFiles = {
  id: number;
  link: string;
  file_type: string;
};

type VideoPictures = {
  id: number;
  nr: number;
  picture: string;
};
