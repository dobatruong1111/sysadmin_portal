import { MyFormGroupUnstyled } from '../../../../components';
import { UseFormProps } from 'react-hook-form';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useState } from 'react';
import { UserAuthorDTOCreate } from '../../../../types/dto/userAuthor';
import { useCreateUserAuthorMutation } from '../../api/apiUserAuthor';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { UserAuthorFormFields } from './UserAuthorFormFields';

export const UserAuthorCreateForm = (props: {
  onSuccessCallback?: () => void;
}) => {
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createUserAuthor] = useCreateUserAuthorMutation();
  const notifySnackbar = useNotifySnackbar();

  const onSubmit = async (formData: UserAuthorDTOCreate) => {
    if (formData.id.length === 0 || formData.name.length === 0)
      setErrorMessage('Cần điền vào trường bắt buộc');
    else {
      const result = await createUserAuthor(formData);
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

  const formOptions: UseFormProps<UserAuthorDTOCreate> = {
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
        <UserAuthorFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={false}
        />
      )}
    />
  );
};
