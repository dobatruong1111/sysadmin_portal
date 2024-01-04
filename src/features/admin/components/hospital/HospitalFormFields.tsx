import { Grid, Stack, Typography, styled } from '@mui/material';
import { MyFormTextField } from '../../../../components';
import { MyFormCheckboxField } from '../../../../components/Elements/Inputs/MyFormCheckboxField';
import { Control } from 'react-hook-form';
import { HospitalDTOCreate } from '../../../../types/dto/hospital';
import ImageUploader from '../../../../components/Buttons/ImageUploader';
import { useState } from 'react';

export type HospitalFormFieldsProps = {
  control: Control<HospitalDTOCreate>;
  errorMessage: string | undefined;
  disableIdField: boolean;
  onImageSelected: (image: string | null) => void;
  onLogoFullSelected: (image: string | null) => void;
  imageUrl?: string;
  imageUrlLogoFull?: string;
};

export const HospitalFormFields = (props: HospitalFormFieldsProps) => {
  const { control, errorMessage, disableIdField, onImageSelected, onLogoFullSelected, imageUrl, imageUrlLogoFull } = props;
  const [selectedImage, setSelectedImage] = useState<string | null>(imageUrl ?? null);
  const [selectedImageLogoFull, setselectedImageLogoFull] = useState<string | null>(imageUrlLogoFull ?? null);

  const handleImageSelected = (image: string | null) => {
    setSelectedImage(image);
    onImageSelected(image);
  };

  const handleLogoFullSelected = (image: string | null) => {
    setselectedImageLogoFull(image);
    onLogoFullSelected(image);
  };

  return (
    <Stack spacing={1} alignItems="center" width="100%">
      {errorMessage && (
        <Typography fontSize="12px" color="red">
          {errorMessage}
        </Typography>
      )}
      <Stack spacing={1} alignItems="center" width="100%">
        <Grid style={{marginRight: '14px'}} container spacing={2}>
          <Grid item xs={6} style={{paddingTop: 0}}>
            <MyFormTextField
              name="id"
              control={control}
              MyTextFieldProps={{
                label: 'ID',
                placeholder: 'ID',
                fullWidth: true,
                required: true,
                size: 'small',
                autoComplete: 'off',
                disabled: disableIdField,
              }}
            />
            <MyFormTextField
              name="address"
              control={control}
              MyTextFieldProps={{
                label: 'Địa chỉ',
                placeholder: 'Địa chỉ',
                fullWidth: true,
                size: 'small',
                autoComplete: 'off',
              }}
            />
            <MyFormTextField
              name="email"
              control={control}
              MyTextFieldProps={{
                label: 'Địa chỉ email',
                placeholder: 'Địa chỉ email',
                fullWidth: true,
                size: 'small',
                autoComplete: 'off',
              }}
            />
            <StyledText>Logo rút gọn</StyledText>
            <ImageUploader
              name='logo'
              onImageSelected={handleImageSelected}
              imageUrl={selectedImage}
            />
          </Grid>
          <Grid item xs={6} style={{paddingTop: 0}}>
            <MyFormTextField
              name="name"
              control={control}
              MyTextFieldProps={{
                label: 'Tên bệnh viện',
                placeholder: 'Tên bệnh viện',
                fullWidth: true,
                required: true,
                size: 'small',
                autoComplete: 'off',
              }}
            />
            <MyFormTextField
              name="phone"
              control={control}
              MyTextFieldProps={{
                type: 'tel',
                label: 'Số điện thoại',
                placeholder: 'Số điện thoại',
                fullWidth: true,
                size: 'small',
                autoComplete: 'off',
              }}
            />
            <Stack spacing={1} direction="row" alignItems="center" width="100%" marginBottom={'4px'}>
              <MyFormCheckboxField
                name="enabled"
                control={control}
                MyCheckboxProps={{
                  size: 'small',
                  color: 'success',
                  sx: {
                    '&.Mui-checked': {
                      color: '#0e8a72',
                    },
                  },
                }}
              />
              <Typography>Ưu tiên</Typography>
            </Stack>
            <StyledText>Logo đầy đủ</StyledText>
            <ImageUploader
              name='logoFull'
              onImageSelected={handleLogoFullSelected}
              imageUrl={selectedImageLogoFull}
            />
          </Grid>
        </Grid>
      </Stack>
    </Stack>
  );
};

const StyledText = styled('text')`
  color: #000;
  font-family: Kanit;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.18px;
`