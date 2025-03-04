export type Photo = {
  id: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_colors: string;
  src: {
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
};
