import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import {
  ConsumableTypeDTO,
  ConsumableTypeDTOUpdate,
} from '../../../../types/dto/consumableType';
import { useUpdateConsumableTypeMutation } from '../../api/apiConsumableType';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { ConsumableTypeFormFields } from './ConsumableTypeFormFields';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_CONSUMABLE_TYPE } from '../../../../stores/table/tableInitialState';

export type ConsumableTypeEditFormProps = {
  onSuccessCallback?: () => void;
  record: ConsumableTypeDTO;
};

export const ConsumableTypeEditForm = (props: ConsumableTypeEditFormProps) => {
  const { onSuccessCallback, record } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [editConsumableType] = useUpdateConsumableTypeMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();

  const formOptions: UseFormProps<ConsumableTypeDTOUpdate> = {
    mode: 'onBlur',
    defaultValues: {
      id: record.id ?? '',
      name: record.name ?? '',
      description: record.description ?? '',
    },
  };

  const onSubmit = async (formData: ConsumableTypeDTOUpdate) => {
    if (formData.name.length === 0)
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    else {
      const result = await editConsumableType(formData);
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
            tableId: TABLE_CONSUMABLE_TYPE,
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
          'submitEditForm',
          () => formInstance.submit && formInstance.submit()
        )
      }
      onSubmit={onSubmit}
      submitOnEnter={true}
      formOptions={formOptions}
      renderInputs={({ control }) => (
        <ConsumableTypeFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={true}
        />
      )}
    />
  );
};
