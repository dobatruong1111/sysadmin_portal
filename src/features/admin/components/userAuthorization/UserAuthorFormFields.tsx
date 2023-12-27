import { Stack, Typography } from '@mui/material';
import { MyFormTextField } from '../../../../components';
import { Control } from 'react-hook-form';
import { UserAuthorDTO } from '../../../../types/dto/userAuthor';

export type UserAuthorFormFieldsProps = {
  control: Control<UserAuthorDTO>;
  errorMessage: string | undefined;
  disableIdField: boolean;
};

export const UserAuthorFormFields = (props: UserAuthorFormFieldsProps) => {
  const { control, errorMessage, disableIdField } = props;
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
      <MyFormTextField
        name="name"
        control={control}
        MyTextFieldProps={{
          label: 'Tên phân quyền',
          placeholder: 'Tên phân quyền',
          fullWidth: true,
          required: true,
          size: 'small',
          autoComplete: 'off',
        }}
      />
      <MyFormTextField
        name="description"
        control={control}
        MyTextFieldProps={{
          label: 'Mô tả',
          placeholder: 'Mô tả',
          fullWidth: true,
          size: 'small',
          autoComplete: 'off',
          multiline: true,
          rows: 2,
        }}
      />
    </Stack>
  );
};
