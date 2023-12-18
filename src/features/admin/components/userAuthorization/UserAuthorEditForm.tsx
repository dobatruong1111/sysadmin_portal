import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { UseFormProps } from "react-hook-form";
import { MyFormGroupUnstyled, MyFormTextField } from "../../../../components";
import { Stack, Typography } from "@mui/material";
import { useState } from "react";
import { UserAuthorDTO } from "../../../../types/dto/userAuthor";
import { useUpdateUserAuthorMutation } from "../../api/apiUserAuthor";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";

export type UserAuthorEditFormProps = {
    onSuccessCallback?: () => void,
    record: UserAuthorDTO
}

export const UserAuthorEditForm = (props: UserAuthorEditFormProps) => {
    const { onSuccessCallback, record } = props;
    const register = useRegisterAdminFunctions();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [editUserAuthor] = useUpdateUserAuthorMutation();
    const notifySnackbar = useNotifySnackbar();

    const formOptions: UseFormProps<UserAuthorDTO> = {
        mode: 'onChange',
        defaultValues: {
            id: record.id,
            name: record.name,
            description: record.description
        }
    }

    const onSubmit = async (formData: UserAuthorDTO) => {
        const submitForm: UserAuthorDTO = {
            id: formData.id ?? '',
            name: formData.name ?? '',
            description: formData.description ?? '',
        }
        if (submitForm.name.length === 0) setErrorMessage("Trường bắt buộc không được bỏ trống");
        else {
            const result = await editUserAuthor(submitForm);
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
                        name='id'
                        control={control}
                        MyTextFieldProps={{
                            label: 'ID phân quyền',
                            placeholder: 'ID phân quyền',
                            fullWidth: true,
                            required: true,
                            size: 'small',
                            disabled: true
                        }}
                    />
                    <MyFormTextField
                        name='name'
                        control={control}
                        MyTextFieldProps={{
                            label: 'Tên phân quyền',
                            placeholder: 'Tên phân quyền',
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
