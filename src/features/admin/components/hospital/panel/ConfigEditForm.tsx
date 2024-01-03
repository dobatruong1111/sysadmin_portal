import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UseFormProps } from 'react-hook-form';
import { ConfigFormFields } from './ConfigFormFields';
import { MyFormGroupUnstyled } from '../../../../../components/Form/MyFormGroupUnstyled';
import { ConfigDTO, ConfigDTOUpdate } from '../../../../../types/dto/config';
import { TABLE_HOSPITAL, TABLE_HOSPITAL_CONFIG } from '../../../../../stores/table/tableInitialState';
import { useNotifySnackbar } from '../../../../../providers/NotificationProvider';
import { useRegisterAdminFunctions } from '../../../../../providers/admin/AdminProvider';
import { setSelectedRow } from '../../../../../stores/table/tableSlice';
import { useUpdateConfigMutation } from '../../../api/apiConfig';
import { MyFormCheckboxField } from '../../../../../components/Elements/Inputs/MyFormCheckboxField';
import { Stack } from '@mui/system';
import { MyFormTextField } from '../../../../../components/Elements/Inputs/MyFormTextField';
import { MenuItem, Typography } from '@mui/material';
import { MyFormSelectField } from '../../../../../components/Elements/Inputs/MyFormSelectField';

export type ConfigEditFormProps = {
  onSuccessCallback?: () => void;
  record: ConfigDTO;
};

export const ConfigEditForm = (
  props: ConfigEditFormProps
) => {
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
  const hospitalId = selectedRow?.id;

  const formOptions: UseFormProps<ConfigDTOUpdate> = {
    mode: 'onChange',
    defaultValues: {
        attributeValue: record.attributeValue,
        attributeID: record.attributeID,
        preferred: record.preferred,
    },
  };

  const onSubmit = async (formData: ConfigDTOUpdate) => {
    if (formData.attributeValue.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editConfig( {
        hospitalID: hospitalId,
        attributeValue: '',
        attributeID: '',
        preferred: false
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

  const datatypes = useMemo<Array<string>>(
    () => ['ENABLE_TIMETABLE', 'CONNECT_PORTAL', 'CONNECT_HIS',
     'CONNECT_MWL', 'MULTIPLE_VIEWER_TAB', 'PRIVATE_IP_RANGES'],
    []
  );

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
            name="attributeID"
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
      )}
    />
  );
};
