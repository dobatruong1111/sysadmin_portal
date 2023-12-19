import { useState } from "react";
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { ConsumableTypeDTO } from "../../../../types/dto/consumableType"
import { useUpdateConsumableTypeMutation } from "../../api/apiConsumableType";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";
import { UseFormProps } from "react-hook-form";
import { MyFormGroupUnstyled, MyFormTextField } from "../../../../components";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";

export type ConsumableTypeEditFormProps = {
    onSuccessCallback?: () => void,
    record: ConsumableTypeDTO
}

export const ConsumableTypeEditForm = (props: ConsumableTypeEditFormProps) => {
    const { onSuccessCallback, record } = props;
    const register = useRegisterAdminFunctions();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [editConsumableType] = useUpdateConsumableTypeMutation();
    const notifySnackbar = useNotifySnackbar();

    const formOptions: UseFormProps<ConsumableTypeDTO> = {
        mode: 'onChange',
        defaultValues: {
            id: record.id,
            name: record.name,
            description: record.description
        }
    }

    const onSubmit = async (formData: ConsumableTypeDTO) => {
        const submitForm: ConsumableTypeDTO = {
            id: formData.id ?? '',
            name: formData.name ?? '',
            description: formData.description ?? ''
        }
        if (submitForm.name.length === 0) setErrorMessage("Trường bắt buộc không được bỏ trống");
        else {
            const result = await editConsumableType(submitForm);
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
                <Stack spacing={1} alignItems='center'>
                    {errorMessage && <Typography fontSize='14px' color='red'>{errorMessage}</Typography>}
                    <MyFormTextField
                        name="id"
                        control={control}
                        MyTextFieldProps={{
                            label: 'ID loại vật tư tiêu hao',
                            placeholder: 'ID loại vật tư tiêu hao',
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
                            label: 'Tên loại vật tư tiêu hao',
                            placeholder: 'Tên loại vật tư tiêu hao',
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
