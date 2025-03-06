export const fetchPhotoById = async (id: number) => {
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  try {
    const response = await fetch(`https://api.pexels.com/v1/photos/${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch photo");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching photo:", error);
    throw error;
  }
};
