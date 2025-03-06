export type ActivePage = "photos" | "favourite";

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
};

export type FavouritePhotoCard = {
  alt: string;
  avg_color: string;
  id: number;
  photographer: string;
};
