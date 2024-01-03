import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../../components/Form/MyFormGroupUnstyled';
import { ConfigDTO, ConfigDTOUpdate } from '../../../../../types/dto/config';
import {
  TABLE_HOSPITAL,
  TABLE_HOSPITAL_CONFIG,
} from '../../../../../stores/table/tableInitialState';
import { useNotifySnackbar } from '../../../../../providers/NotificationProvider';
import { useRegisterAdminFunctions } from '../../../../../providers/admin/AdminProvider';
import { setSelectedRow } from '../../../../../stores/table/tableSlice';
import { useUpdateConfigMutation } from '../../../api/apiConfig';
import { MyFormCheckboxField } from '../../../../../components/Elements/Inputs/MyFormCheckboxField';
import { Stack } from '@mui/system';
import { MyFormTextField } from '../../../../../components/Elements/Inputs/MyFormTextField';
import { Typography } from '@mui/material';

export type ConfigEditFormProps = {
  onSuccessCallback?: () => void;
  record: ConfigDTO;
};

export const ConfigEditForm = (props: ConfigEditFormProps) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editConfig] = useUpdateConfigMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();
  const selectedRow = useSelector(
    (state: any) =>
      state.tableReducer.data[TABLE_HOSPITAL].selection.selectedRow
  );
  const hospitalID = selectedRow?.id;

  const formOptions: UseFormProps<ConfigDTOUpdate> = {
    mode: 'onBlur',
    defaultValues: {
      id: record.id,
      attributeValue: record.attributeValue ?? '',
      preferred: record.preferred ?? '',
    },
  };

  const onSubmit = async (formData: ConfigDTOUpdate) => {
    if (formData.attributeValue.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editConfig({
        data: formData,
        hospitalID: hospitalID,
      });
      if ('error' in result) {
        notifySnackbar({
          message: 'Lỗi',
          options: {
            variant: 'error',
          },
        });
      } else {
        notifySnackbar({
          message: 'Thành Công',
          options: {
            variant: 'success',
          },
        });
        dispatch(
          setSelectedRow({
            tableId: TABLE_HOSPITAL_CONFIG,
            selectedRow: null,
          })
        );
        onSuccessCallback && onSuccessCallback();
      }
    }
  };

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'submitEditFormPanel',
          () => formInstance.submit && formInstance.submit()
        )
      }
      onSubmit={onSubmit}
      submitOnEnter={true}
      formOptions={formOptions}
      renderInputs={({ control }) => (
        <Stack spacing={1} alignItems="center" width="100%">
          {errorMessage && (
            <Typography fontSize="12px" color="red">
              {errorMessage}
            </Typography>
          )}
          <Stack spacing={1} alignItems="center" width="100%">
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
                disabled: true,
              }}
            />
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
      )}
    />
  );
};
