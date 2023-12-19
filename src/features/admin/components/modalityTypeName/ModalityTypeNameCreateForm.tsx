import { useState } from "react";
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { useCreateModalityTypeNameMutation } from "../../api/apiModalityTypeName";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";
import { ModalityTypeNameDTO } from "../../../../types/dto/modalityTypeName";
import { UseFormProps } from "react-hook-form";
import { MyFormGroupUnstyled, MyFormTextField } from "../../../../components";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

export const ModalityTypeNameCreateForm = (props: { onSuccessCallback?: () => void }) => {
    const { onSuccessCallback } = props;
    const register = useRegisterAdminFunctions();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [createModalityTypeName] = useCreateModalityTypeNameMutation();
    const notifySnackbar = useNotifySnackbar();

    const onSubmit = async (formData: ModalityTypeNameDTO) => {
        const submitForm: ModalityTypeNameDTO = {
            id: formData.id ?? '',
            name: formData.name ?? '',
            description: formData.description ?? ''
        }
        if (submitForm.id.length === 0 || submitForm.name.length === 0) setErrorMessage('Cần điền vào trường bắt buộc');
        else {
            const result = await createModalityTypeName(submitForm);
            if ('error' in result) {
                notifySnackbar({
                    message: 'Lỗi',
                    options: {
                        variant: 'error'
                    }
                })
            } else {
                notifySnackbar({
                    message: 'Thành công',
                    options: {
                        variant: 'success'
                    }
                })
                onSuccessCallback && onSuccessCallback();
            }
        }
    }

    const formOptions: UseFormProps<ModalityTypeNameDTO> = {
        mode: 'onChange',
        defaultValues: {
            id: '',
            name: '',
            description: ''
        }
    }

    return (
        <MyFormGroupUnstyled 
            registerFormFunctions={(formInstance) => register('submitCreateForm', () => formInstance.submit && formInstance.submit())}
            onSubmit={onSubmit}
            submitOnEnter={true}
            formOptions={formOptions}
            renderInputs={({ control }) => (
                <Stack spacing={1} alignItems={'center'}>
                    {errorMessage && <Typography fontSize='14px' color='red'>{errorMessage}</Typography>}
                    <MyFormTextField
                        name='id'
                        control={control}
                        MyTextFieldProps={{
                            label: 'ID loại ca',
                            placeholder: 'ID loại ca',
                            fullWidth: true,
                            required: true,
                            size: 'small',
                            autoComplete: 'off'
                        }}
                    />
                    <MyFormTextField
                        name='name'
                        control={control}
                        MyTextFieldProps={{
                            label: 'Tên loại ca',
                            placeholder: 'Tên loại ca',
                            fullWidth: true,
                            required: true,
                            size: 'small',
                            autoComplete: 'off'
                        }}
                    />
                    <MyFormTextField
                        name='description'
                        control={control}
                        MyTextFieldProps={{
                            label: 'Mô tả',
                            placeholder: 'Mô tả',
                            fullWidth: true,
                            size: 'small',
                            autoComplete: 'off'
                        }}
                    />
                </Stack>
            )}
        />
    )
}
