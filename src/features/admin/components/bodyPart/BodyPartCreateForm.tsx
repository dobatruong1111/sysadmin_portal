import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useCreateBodyPartMutation } from '../../api/apiBodyPart';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { BodyPartDTOCreate } from '../../../../types/dto/bodyPart';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { BodyPartFormFields } from './BodyPartFormFields';

export function BodyPartCreateForm(props: { onSuccessCallback?: () => void }) {
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createBodyPart] = useCreateBodyPartMutation();
  const notifySnackbar = useNotifySnackbar();

  const onSubmit = async (formData: BodyPartDTOCreate) => {
    if (formData.id.length === 0 || formData.name.length === 0)
      setErrorMessage('Cần điền vào trường bắt buộc');
    else {
      const result = await createBodyPart(formData);
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

  const formOptions: UseFormProps<BodyPartDTOCreate> = {
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
      submitOnEnter
      formOptions={formOptions}
      renderInputs={({ control }) => (
        <BodyPartFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={false}
        />
      )}
    />
  );
}
