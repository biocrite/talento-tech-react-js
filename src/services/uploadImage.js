
export async function uploadImageToImgBB(file) {
  const apiKey = import.meta.env.VITE_IMGBB_API_KEY || "745e79b7db3a6ab1d5fb337852477790";

  if (!apiKey) {
    throw new Error("ImgBB API key is missing.");
  }

  if (!file || !file.type.startsWith("image/")) {
    throw new Error("Please select a valid image.");
  }

  // ImgBB's documented limit for the free API is 32 MB.
  if (file.size > 32 * 1024 * 1024) {
    throw new Error("Image must be smaller than 32 MB.");
  }

  const data = new FormData();
  data.append("image", file);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${apiKey}`,
    {
      method: "POST",
      body: data,
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.error?.message || "Image upload failed.");
  }

return {
  imageUrl: result.data.url,
  deleteUrl: result.data.delete_url,
};
}
