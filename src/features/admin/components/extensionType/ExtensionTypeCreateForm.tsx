import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useCreateExtensionTypeMutation } from '../../api/apiExtensionType';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { ExtensionTypeDTOCreate } from '../../../../types/dto/extensionType';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { ExtensionTypeFormFields } from './ExtensionTypeFormFields';

export const ExtensionTypeCreateForm = (props: {
  onSuccessCallback?: () => void;
}) => {
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createExtensionType] = useCreateExtensionTypeMutation();
  const notifySnackbar = useNotifySnackbar();

  const onSubmit = async (formData: ExtensionTypeDTOCreate) => {
    if (formData.id.length === 0 || formData.name.length === 0)
      setErrorMessage('Cần điền vào trường bắt buộc');
    else {
      const result = await createExtensionType(formData);
      if ('error' in result) {
        notifySnackbar({
          message: 'Lỗi',
          options: {
            variant: 'error',
          },
        });
      } else {
        notifySnackbar({
          message: 'Thành công',
          options: {
            variant: 'success',
          },
        });
        onSuccessCallback && onSuccessCallback();
      }
    }
  };

  const formOptions: UseFormProps<ExtensionTypeDTOCreate> = {
    mode: 'onBlur',
    defaultValues: {
      id: '',
      name: '',
      description: '',
    },
  };

  return (
    <MyFormGroupUnstyled
      registerFormFunctions={(formInstance) =>
        register(
          'submitCreateForm',
          () => formInstance.submit && formInstance.submit()
        )
      }
      onSubmit={onSubmit}
      submitOnEnter={true}
      formOptions={formOptions}
      renderInputs={({ control }) => (
        <ExtensionTypeFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={false}
        />
      )}
    />
  );
};
