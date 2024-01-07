import { useState } from 'react';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useCreateStatisticsTypeMutation } from '../../api/apiStatisticsType';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { StatisticsTypeDTOCreate } from '../../../../types/dto/statisticsType';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { StatisticsTypeFormFields } from './StatisticsTypeFormFields';

export const StatisticsTypeCreateForm = (props: {
  onSuccessCallback?: () => void;
}) => {
  const { onSuccessCallback } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [createStatisticsType] = useCreateStatisticsTypeMutation();
  const notifySnackbar = useNotifySnackbar();

  const onSubmit = async (formData: StatisticsTypeDTOCreate) => {
    if (formData.id.length === 0 || formData.name.length === 0)
      setErrorMessage('Cần điền vào trường bắt buộc');
    else {
      const result = await createStatisticsType(formData);
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

  const formOptions: UseFormProps<StatisticsTypeDTOCreate> = {
    mode: 'onBlur',
    defaultValues: {
      id: '',
      name: '',
      description: '',
      config: '',
      filterParams: [],
      outputSchema: '',
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
        <StatisticsTypeFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={false}
        />
      )}
    />
  );
};
