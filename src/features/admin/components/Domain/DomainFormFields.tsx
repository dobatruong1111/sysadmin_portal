import { Control } from 'react-hook-form';
import { DomainDTOCreate } from '../../../../types/dto/domain';
import { MenuItem, Stack, Typography } from '@mui/material';
import { MyFormTextField } from '../../../../components';
import { MyFormCheckboxField } from '../../../../components/Elements/Inputs/MyFormCheckboxField';
import { MyFormSelectField } from '../../../../components/Elements/Inputs/MyFormSelectField';
import { HospitalDTO } from '../../../../types/dto/hospital';

export type DomainFormFieldsProps = {
  control: Control<DomainDTOCreate>;
  errorMessage: string | undefined;
  disableIdField: boolean;
  hospitals?: HospitalDTO[];
};

export const DomainFormFields = (props: DomainFormFieldsProps) => {
  const { control, errorMessage, disableIdField, hospitals = [] } = props;
  return (
    <Stack spacing={1} alignItems="center" width="100%">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyItems: 'center',
          height: '20px',
        }}
      >
        {errorMessage && (
          <Typography fontSize="12px" color="red">
            {errorMessage}
          </Typography>
        )}
      </div>
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
      <MyFormSelectField
        name="hospitalID"
        control={control}
        MySelectProps={{
          label: 'Hospital ID',
          size: 'small',
          fullWidth: true,
        }}
        required={true}
      >
        {hospitals.map((item) => (
          <MenuItem key={item.id} value={item.id}>
            {item.id}
          </MenuItem>
        ))}
      </MyFormSelectField>
      <Stack spacing={1} direction="row" alignItems="center" width="100%">
        <MyFormCheckboxField
          name="publicAddress"
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
        <Typography>Địa chỉ public</Typography>
      </Stack>
    </Stack>
  );
};
