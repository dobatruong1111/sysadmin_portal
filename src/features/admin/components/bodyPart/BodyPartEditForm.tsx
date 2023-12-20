import { useState } from "react";
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { BodyPartDTO } from "../../../../types/dto/bodyPart";
import { useUpdateBodyPartMutation } from "../../api/apiBodyPart";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";
import { UseFormProps } from "react-hook-form";
import { MyFormGroupUnstyled, MyFormTextField } from "../../../../components";
import { Stack, Typography } from "@mui/material";

export type BodyPartEditFormProps = {
    onSuccessCallback?: () => void;
    record: BodyPartDTO;
};
  
export function BodyPartEditForm(props: BodyPartEditFormProps) {
    const { onSuccessCallback, record } = props;
    const register = useRegisterAdminFunctions();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [editBodyPart] = useUpdateBodyPartMutation();
    const notifySnackbar = useNotifySnackbar();
  
    const formOptions: UseFormProps<BodyPartDTO> = {
        mode: 'onChange',
        defaultValues: {
            id: record.id,
            name: record.name,
            description: record.description,
        },
    };
  
    const onSubmit = async (formData: BodyPartDTO) => {
        const submitForm: BodyPartDTO = {
            id: formData.id ?? '',
            name: formData.name ?? '',
            description: formData.description ?? '',
        };
        if (submitForm.name.length === 0) setErrorMessage('Trường bắt buộc không được bỏ trống');
        else {
            const result = await editBodyPart(submitForm);
            if ('error' in result) {
                notifySnackbar({
                    message: 'Lỗi',
                    options: {
                        variant: 'error',
                    },
                });
            } else {
                notifySnackbar({
                    message: 'Thành Công',
                    options: {
                        variant: 'success',
                    },
                });
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
                            disabled: true,
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
  