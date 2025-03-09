export const loadFromLocalStorage = (type: "photo" | "video") => {
  const key = type === "photo" ? "favourite-photos" : "favourite-videos";
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const saveToLocalStorage = (
  id: number,
  type: "photo" | "video",
  avg_color?: string
) => {
  const key = type === "photo" ? "favourite-photos" : "favourite-videos";

  const itemObj = { id, avg_color, type };
  const favorites = loadFromLocalStorage(type);

  if (!favorites.some((item: { id: number }) => item.id === id)) {
    favorites.push(itemObj);
  }

  localStorage.setItem(key, JSON.stringify(favorites));
};

export const removeFromLocalStorage = (id: number, type: "photo" | "video") => {
  const key = type === "photo" ? "favourite-photos" : "favourite-videos";
  const favorites = loadFromLocalStorage(type);

  const updatedFavorites = favorites.filter(
    (item: { id: number }) => item.id !== id
  );
  localStorage.setItem(key, JSON.stringify(updatedFavorites));
};

export const isFavorited = (id: number, type: "photo" | "video") => {
  const favorites = loadFromLocalStorage(type);
  return favorites.some((item: { id: number }) => item.id === id);
};

export const toggleFavourite = (
  e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  id: number,
  avgColor: string | undefined,
  type: "photo" | "video",
  isFavourited: boolean,
  setIsFavourited: React.Dispatch<React.SetStateAction<boolean>>,
  onRemove?: (id: number) => void
) => {
  e.stopPropagation();

  if (isFavourited) {
    removeFromLocalStorage(id, type);
    onRemove?.(id);
  } else {
    if (type === "photo") {
      saveToLocalStorage(id, type, avgColor);
    } else {
      saveToLocalStorage(id, type);
    }
  }

  setIsFavourited(!isFavourited);
};
