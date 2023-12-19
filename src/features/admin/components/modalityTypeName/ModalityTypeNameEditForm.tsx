import { useState } from "react";
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { ModalityTypeNameDTO } from "../../../../types/dto/modalityTypeName"
import { useUpdateModalityTypeNameMutation } from "../../api/apiModalityTypeName";
import { UseFormProps } from "react-hook-form";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";
import { MyFormGroupUnstyled, MyFormTextField } from "../../../../components";
import { Stack, Typography } from "@mui/material";

export type ModalityTypeNameEditFormProps = {
    onSuccessCallback?: () => void,
    record: ModalityTypeNameDTO
}

export const ModalityTypeNameEditForm = (props: ModalityTypeNameEditFormProps) => {
    const { onSuccessCallback, record } = props;
    const register = useRegisterAdminFunctions();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [editModalityTypeName] = useUpdateModalityTypeNameMutation();
    const notifySnackbar = useNotifySnackbar();

    const formOptions: UseFormProps<ModalityTypeNameDTO> = {
        mode: 'onChange',
        defaultValues: {
            id: record.id,
            name: record.name,
            description: record.description
        }
    }

    const onSubmit =async (formData: ModalityTypeNameDTO) => {
        const submitForm: ModalityTypeNameDTO = {
            id: formData.id ?? '',
            name: formData.name ?? '',
            description: formData.description ?? ''
        }
        if (submitForm.name.length === 0) setErrorMessage("Trường bắt buộc không được bỏ trống");
        else {
            const result = await editModalityTypeName(submitForm);
            if ('error' in result) {
                notifySnackbar({
                    message: 'Lỗi',
                    options: {
                        variant: 'error'
                    }
                })
            } else {
                notifySnackbar({
                    message: 'Thành Công',
                    options: {
                        variant: 'success'
                    }
                })
                onSuccessCallback && onSuccessCallback();
            }
        }
    }

    return (
        <MyFormGroupUnstyled
            registerFormFunctions={(formInstance) => register('submitEditForm', () => formInstance.submit && formInstance.submit())}
            onSubmit={onSubmit}
            submitOnEnter={true}
            formOptions={formOptions}
            renderInputs={({control}) => (
                <Stack spacing={1} alignItems={'center'}>
                    {errorMessage && <Typography fontSize='14px' color='red'>{errorMessage}</Typography>}
                    <MyFormTextField
                        name="id"
                        control={control}
                        MyTextFieldProps={{
                            label: 'ID loại ca',
                            placeholder: 'ID loại ca',
                            fullWidth: true,
                            required: true,
                            size: 'small',
                            disabled: true
                        }}
                    />
                    <MyFormTextField
                        name="name"
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
                        name="description"
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
