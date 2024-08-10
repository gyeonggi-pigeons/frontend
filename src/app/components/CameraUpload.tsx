import React, { useState } from 'react';

type Props = {
  onImageUpload: (file: File) => void;
};

const CameraUpload: React.FC<Props> = ({ onImageUpload }) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  return (
    <div className="camera-upload">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <input type="file" accept="image/*" capture={false} onChange={handleCapture} />
      {imagePreview && <img src={imagePreview} alt="Preview" className="preview" />}
    </div>
  );
};

export default CameraUpload;
