const API_URL = "https://metrologyai.onrender.com/api";

// Analyze product image
export const analyzeProduct = async (imageFile) => {
  if (!imageFile) {
    throw new Error("Please select a product image.");
  }

  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await fetch(`${API_URL}/analyze`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to analyze the product."
    );
  }

  return data;
};

// Get previous scan history
export const getScanHistory = async () => {
  const response = await fetch(`${API_URL}/history`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch scan history."
    );
  }

  return data;
};