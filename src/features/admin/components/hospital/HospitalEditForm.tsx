import { useState } from 'react';
import { HospitalDTOUpdate } from '../../../../types/dto/hospital';
import { useRegisterAdminFunctions } from '../../../../providers/admin/AdminProvider';
import { useUpdateHospitalMutation } from '../../api/apiHospital';
import { useNotifySnackbar } from '../../../../providers/NotificationProvider';
import { UseFormProps } from 'react-hook-form';
import { MyFormGroupUnstyled } from '../../../../components';
import { HospitalFormFields } from './HospitalFormFields';
import { useDispatch } from 'react-redux';
import { setSelectedRow } from '../../../../stores/table/tableSlice';
import { TABLE_HOSPITAL } from '../../../../stores/table/tableInitialState';

type HospitalEditFormProps = {
  onSuccessCallback?: () => void;
  record?: HospitalDTOUpdate;
  data?: HospitalDTOUpdate;
};

export const HospitalEditForm = (props: HospitalEditFormProps) => {
  const { onSuccessCallback, data } = props;
  const register = useRegisterAdminFunctions();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<string | null>(
    data?.logo || null
  );
  const [selectedImageLogoFull, setselectedImageLogoFull] = useState<
    string | null
  >(data?.logoFull || null);
  const [editHospital] = useUpdateHospitalMutation();
  const notifySnackbar = useNotifySnackbar();
  const dispatch = useDispatch();

  const formOptions: UseFormProps<HospitalDTOUpdate> = {
    mode: 'onBlur',
    defaultValues: {
      id: data?.id || '',
      name: data?.name || '',
      description: data?.description || '',
      phone: data?.phone || '',
      email: data?.email || '',
      address: data?.address || '',
      enabled: data?.enabled || false,
      logo: data?.logo || '',
      logoFull: data?.logoFull || '',
    },
  };

  const onSubmit = async (formData: HospitalDTOUpdate) => {
    const submitForm: HospitalDTOUpdate = {
      id: formData.id || '',
      name: formData.name || '',
      description: formData.description || '',
      phone: formData.phone || '',
      email: formData.email || '',
      address: formData.address || '',
      enabled: formData.enabled || false,
      logo: selectedImage || '',
      logoFull: selectedImageLogoFull || '',
    };
    if (submitForm.name.length === 0) {
      setErrorMessage('Trường bắt buộc không được bỏ trống');
    } else {
      const result = await editHospital(submitForm);
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
        dispatch(
          setSelectedRow({
            tableId: TABLE_HOSPITAL,
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
        <HospitalFormFields
          control={control}
          errorMessage={errorMessage}
          disableIdField={true}
          onImageSelected={setSelectedImage}
          onLogoFullSelected={setselectedImageLogoFull}
          imageUrl={data?.logo}
          imageUrlLogoFull={data?.logoFull}
        />
      )}
    />
  );
};
