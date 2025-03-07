export const fetchVideoById = async (id: number) => {
  const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;
  try {
    const response = await fetch(`https://api.pexels.com/videos/videos/${id}`, {
      headers: {
        Authorization: API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch video");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching video:", error);
    throw error;
  }
};
