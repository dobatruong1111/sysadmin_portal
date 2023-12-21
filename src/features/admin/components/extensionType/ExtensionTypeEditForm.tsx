import { useState } from "react";
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { ExtensionTypeDTO } from "../../../../types/dto/extensionType"
import { useUpdateExtensionTypeMutation } from "../../api/apiExtensionType";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";
import { UseFormProps } from "react-hook-form";
import { MyFormGroupUnstyled, MyFormTextField } from "../../../../components";
import { Stack, Typography } from "@mui/material";

export type ExtensionTypeEditFormProps = {
    onSuccessCallback?: () => void,
    record: ExtensionTypeDTO
}

export const ExtensionTypeEditForm = (props: ExtensionTypeEditFormProps) => {
    const { onSuccessCallback, record } = props;
    const register = useRegisterAdminFunctions();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [editExtensionType] = useUpdateExtensionTypeMutation();
    const notifySnackbar = useNotifySnackbar();

    const formOptions: UseFormProps<ExtensionTypeDTO> = {
        mode: 'onChange',
        defaultValues: {
            id: record.id,
            name: record.name,
            description: record.description
        }
    }

    const onSubmit = async (formData: ExtensionTypeDTO) => {
        const submitForm: ExtensionTypeDTO = {
            id: formData.id ?? '',
            name: formData.name ?? '',
            description: formData.description ?? ''
        }
        if (submitForm.name.length === 0) setErrorMessage('Trường bắt buộc không được bỏ trống');
        else {
            const result = await editExtensionType(submitForm);
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

    return (
        <MyFormGroupUnstyled
            registerFormFunctions={(formInstance) => register('submitEditForm', () => formInstance.submit && formInstance.submit())}
            onSubmit={onSubmit}
            submitOnEnter={true}
            formOptions={formOptions}
            renderInputs={({control}) => (
                <Stack spacing={1} alignItems='center'>
                    {errorMessage && <Typography fontSize='14px' color='red'>{errorMessage}</Typography>}
                    <MyFormTextField
                        name="id"
                        control={control}
                        MyTextFieldProps={{
                            label: 'ID chức năng mở rộng',
                            placeholder: 'ID chức năng mở rộng',
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
                            label: 'Tên chức năng mở rộng',
                            placeholder: 'Tên chức năng mở rộng',
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
