import { useState } from "react";
import "./ImageUploader.css";

function ImageUploader({ onImageSelect }) {
  const [preview, setPreview] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select a valid image.");
      return;
    }

    setFileName(file.name);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);

    if (onImageSelect) {
      onImageSelect(file);
    }
  };

  const removeImage = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setPreview(null);
    setFileName("");

    if (onImageSelect) {
      onImageSelect(null);
    }
  };

  return (
    <div className="image-uploader">

      {!preview ? (
        <label className="upload-area">

          <div className="upload-icon">
            📦
          </div>

          <h2 className="upload-title">
            Upload Product Image
          </h2>

          <p className="upload-description">
            Upload a clear photo of the product label/package
          </p>

          <span className="upload-button">
            Choose Image
          </span>

          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
          />

        </label>
      ) : (
        <div>

          <div className="image-preview-container">
            <img
              src={preview}
              alt="Product preview"
              className="image-preview"
            />
          </div>

          <div className="file-info">

            <div>
              <p className="file-name">
                {fileName}
              </p>

              <p className="file-status">
                Product image ready for analysis
              </p>
            </div>

            <button
              type="button"
              onClick={removeImage}
              className="remove-button"
            >
              Remove
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default ImageUploader;