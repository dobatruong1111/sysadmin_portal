import { useState } from "react";
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { useCreateBodyPartMutation } from "../../api/apiBodyPart";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";
import { BodyPartDTO } from "../../../../types/dto/bodyPart";
import { UseFormProps } from "react-hook-form";
import { MyFormGroupUnstyled, MyFormTextField } from "../../../../components";
import { Stack, Typography } from "@mui/material";

export function BodyPartCreateForm(props: { onSuccessCallback?: () => void }) {
    const { onSuccessCallback } = props;
    const register = useRegisterAdminFunctions();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [createBodyPart] = useCreateBodyPartMutation();
    const notifySnackbar = useNotifySnackbar();
  
    const onSubmit = async (formData: BodyPartDTO) => {
        const submitForm: BodyPartDTO = {
                id: formData.id ?? '',
                name: formData.name ?? '',
                description: formData.description ?? '',
        };
        if (submitForm.id.length === 0 || submitForm.name.length === 0) setErrorMessage('Cần điền vào trường bắt buộc');
        else {
            const result = await createBodyPart(submitForm);
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
  
    const formOptions: UseFormProps<BodyPartDTO> = {
        mode: 'onChange',
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
                <Stack spacing={1} alignItems="center">
                    {errorMessage && (
                        <Typography fontSize="14px" color="red">
                            {errorMessage}
                        </Typography>
                    )}
                    <MyFormTextField
                        name="id"
                        control={control}
                        MyTextFieldProps={{
                            label: 'ID bộ phận',
                            placeholder: 'ID bộ phận',
                            fullWidth: true,
                            required: true,
                            size: 'small',
                            autoComplete: 'off',
                        }}
                    />
                    <MyFormTextField
                        name="name"
                        control={control}
                        MyTextFieldProps={{
                            label: 'Tên bộ phận',
                            placeholder: 'Tên bộ phận',
                            fullWidth: true,
                            required: true,
                            size: 'small',
                            autoComplete: 'off',
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
                            autoComplete: 'off',
                        }}
                    />
                </Stack>
            )}
        />
    );
}