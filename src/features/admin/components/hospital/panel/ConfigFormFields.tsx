import { Control } from 'react-hook-form';
import { MenuItem, Stack, Typography } from '@mui/material';
import { MyFormTextField } from '../../../../../components/Elements/Inputs/MyFormTextField';
import { ConfigDTOCreate } from '../../../../../types/dto/config';
import { MyFormCheckboxField } from '../../../../../components/Elements/Inputs/MyFormCheckboxField';
import { MyFormSelectField } from '../../../../../components/Elements/Inputs/MyFormSelectField';

export type ConfigFormFieldsProps = {
  control: Control<ConfigDTOCreate>;
  errorMessage: string | undefined;
  disableIdField: boolean;
  datatypes: Array<string>;
};

export const ConfigFormFields = (
  props: ConfigFormFieldsProps
) => {
  const { control, errorMessage, datatypes = [] } = props;
  return (
    <Stack spacing={1} alignItems="center" width="100%">
      {errorMessage && (
        <Typography fontSize="12px" color="red">
          {errorMessage}
        </Typography>
      )}
      <Stack spacing={1} alignItems="center" width="100%">
      <MyFormSelectField
        name="attributeID"
        control={control}
        MySelectProps={{
          label: 'Tên loại thuộc tính',
          size: 'small',
          fullWidth: true,
        }}
        required={true}
      >
        {datatypes.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </MyFormSelectField>
      <MyFormTextField
        name="attributeValue"
        control={control}
        MyTextFieldProps={{
          label: 'Giá trị',
          placeholder: 'Giá trị',
          fullWidth: true,
          required: true,
          size: 'small',
          autoComplete: 'off',
        }}
      />
      <Stack spacing={1} direction="row" alignItems="center" width="100%">
          <MyFormCheckboxField
            name="preferred"
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
      </Stack>
    </Stack>
  );
};
