import { ActivePage } from "../types/types";

export const navLinks: { name: string; component: ActivePage }[] = [
  { name: "Photos", component: "photos" },
  { name: "Videos", component: "videos" },
  { name: "Favourite", component: "favourite" },
];
