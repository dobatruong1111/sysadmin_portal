import React, { useState } from 'react';
import { styled } from '@mui/material';
import { MyButton } from '../Elements/Buttons';
interface ImageUploaderProps {
  onImageSelected: (image: string | null) => void;
  imageUrl?: string | null;
  name: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageSelected, imageUrl }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(imageUrl ?? null);
  const img = `data:image/jpeg;base64,${imageUrl}`;
  const [image, setImage] = useState<string | undefined>(img);


  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImage(imageData);
        console.log(imageData);
        const commaIndex = imageData.indexOf(',');
        setSelectedImage(imageData.slice(commaIndex + 1));
        onImageSelected(imageData.slice(commaIndex + 1));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageRemove = () => {
    setSelectedImage(null);
    onImageSelected(null);
  };

  return (
    <div>
      <StyledMyButton>
        Chọn Ảnh
        <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} style={{ display: 'none' }} />
      </StyledMyButton>
      {selectedImage && (
        <div style={{display: 'flex', flexDirection: 'column'}}>
          <img src={image} alt="Selected" style={{ width: '50%', height: '50%' }} />
          <StyledMyButton onClick={handleImageRemove}>Xóa Ảnh</StyledMyButton>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

const StyledMyButton = styled(MyButton)`
  cursor: pointer; 
  display: inline-block; 
  border: 1px solid #0E8A72; 
  color: #0E8A72; 
  border-radius: 5px; 
  width: 30%; 
  text-align: center; 
  align-items: center;
  margin: 5px 0;
`
