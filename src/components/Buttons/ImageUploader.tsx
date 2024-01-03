import React, { useEffect, useState } from 'react';

interface ImageUploaderProps {
  onImageSelected: (image: string | null) => void;
  imageUrl?: string | null;
  name: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, imageUrl, name }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(imageUrl ?? null);
  const img = `data:image/jpeg;base64,${imageUrl}`;
  const [image, setImage] = useState<string | undefined>(img);
  const [selectedImageLogoFull, setselectedImageLogoFull] = useState<string | null>(img);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // setImageData(reader.result as string);
        const imageData = reader.result as string;
        setImage(imageData);
        console.log(imageData);
        const commaIndex = imageData.indexOf(',');
        setSelectedImage(imageData.slice(commaIndex + 1));
        onImageSelected(imageData.slice(commaIndex + 1));
        // setselectedImageLogoFull()
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    console.log(selectedImage);
  }, [selectedImage]);

  const handleImageRemove = () => {
    setSelectedImage(null);
    onImageSelected(null);
  };

  return (
    <div>
      <label style={{ cursor: 'pointer', display: 'inline-block', border: '1px solid #ccc', borderRadius: '5px' }}>
        Upload
        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} style={{ display: 'none' }} />
      </label>
      {selectedImage && (
        <div style={{display: 'flex', flexDirection: 'row'}}>
          <img src={image} alt="Selected" style={{ maxWidth: '50%', maxHeight: '100px' }} />
          <button onClick={handleImageRemove}>Xóa Ảnh</button>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
