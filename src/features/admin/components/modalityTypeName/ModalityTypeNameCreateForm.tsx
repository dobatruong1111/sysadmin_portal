import { useState } from "react";
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { useCreateModalityTypeNameMutation } from "../../api/apiModalityTypeName";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";
import { ModalityTypeNameDTO } from "../../../../types/dto/modalityTypeName";
import { UseFormProps } from "react-hook-form";
import { MyFormGroupUnstyled, MyFormTextField } from "../../../../components";
import { Stack } from "@mui/system";
import { Typography } from "@mui/material";
import { ModalityTypeNameFormFields } from "./ModalityTypeNameFormFields";

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
                <ModalityTypeNameFormFields
                    control={control}
                    errorMessage={errorMessage}
                    disableIdField={false}
                />
            )}
        />
    )
}
