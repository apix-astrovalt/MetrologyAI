const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const analyzeProductImage = async (imageBuffer, mimeType) => {
  const base64Image = imageBuffer.toString("base64");

  const prompt = `
You are an AI assistant for an Indian Legal Metrology compliance checker.

Carefully examine the product package image.

Extract information that is VISIBLY PRESENT on the package.

IMPORTANT:
- Read the text from the image carefully.
- Do NOT guess.
- If something cannot be read or is not visible, return "Not detected".
- Return ONLY JSON.
- Pay special attention to MRP, net quantity, manufacturer/packer,
  manufacturing/packing date and consumer care details.

Extract:

1. productName
2. category
3. manufacturer
4. manufacturerAddress
5. countryOfOrigin
6. netQuantity
7. mrp
8. manufacturingDate
9. expiryDate
10. bestBefore
11. consumerCare
12. dimensions
13. unitSalePrice
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",

    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Image,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    ],

    config: {
      responseMimeType: "application/json",

      responseSchema: {
        type: "object",

        properties: {
          productName: { type: "string" },
          category: { type: "string" },
          manufacturer: { type: "string" },
          manufacturerAddress: { type: "string" },
          countryOfOrigin: { type: "string" },
          netQuantity: { type: "string" },
          mrp: { type: "string" },
          manufacturingDate: { type: "string" },
          expiryDate: { type: "string" },
          bestBefore: { type: "string" },
          consumerCare: { type: "string" },
          dimensions: { type: "string" },
          unitSalePrice: { type: "string" },
        },

        required: [
          "productName",
          "category",
          "manufacturer",
          "manufacturerAddress",
          "countryOfOrigin",
          "netQuantity",
          "mrp",
          "manufacturingDate",
          "expiryDate",
          "bestBefore",
          "consumerCare",
          "dimensions",
          "unitSalePrice",
        ],
      },
    },
  });

  console.log("Gemini response:", response.text);

  return JSON.parse(response.text);
};

module.exports = {
  analyzeProductImage,
};