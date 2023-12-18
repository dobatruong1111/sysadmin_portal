import { Stack, Typography } from "@mui/material";
import { MyFormGroupUnstyled, MyFormTextField } from "../../../../components";
import { UseFormProps } from 'react-hook-form';
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { useState } from "react";
import { UserAuthorDTO } from "../../../../types/dto/userAuthor";
import { useCreateUserAuthorMutation } from "../../api/apiUserAuthor";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";

export const UserAuthorCreateForm = (props: {onSuccessCallback?: () => void}) => {
    const { onSuccessCallback } = props;
    const register = useRegisterAdminFunctions();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [createUserAuthor] = useCreateUserAuthorMutation();
    const notifySnackbar = useNotifySnackbar();

    const onSubmit = async (formData: UserAuthorDTO) => {
        const submitForm: UserAuthorDTO = {
            id: formData.id ?? '',
            name: formData.name ?? '',
            description: formData.description ?? '',
        }
        if (submitForm.id.length === 0 || submitForm.name.length === 0) setErrorMessage('Cần điền vào trường bắt buộc');
        else {
            const result = await createUserAuthor(submitForm);
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

    const formOptions: UseFormProps<UserAuthorDTO> = {
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
                            autoComplete: 'off'
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
