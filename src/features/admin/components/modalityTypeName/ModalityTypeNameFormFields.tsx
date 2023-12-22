import { Control } from "react-hook-form";
import { ModalityTypeNameDTO } from "../../../../types/dto/modalityTypeName";
import { Stack, Typography } from "@mui/material";
import { MyFormTextField } from "../../../../components";

export type ModalityTypeNameFormFieldsProps = {
    control: Control<ModalityTypeNameDTO>;
    errorMessage: string | undefined;
    disableIdField: boolean;
}

export const ModalityTypeNameFormFields = (props: ModalityTypeNameFormFieldsProps) => {
    const { control, errorMessage, disableIdField } = props;
    return (
        <Stack spacing={1} alignItems={'center'}>
            <div style={{height: '20px', width: '100%', textAlign: 'center'}}>{errorMessage && <Typography fontSize='12px' color='red'>{errorMessage}</Typography>}</div>
            <MyFormTextField
                name="id"
                control={control}
                MyTextFieldProps={{
                    label: 'ID loại ca',
                    placeholder: 'ID loại ca',
                    fullWidth: true,
                    required: true,
                    size: 'small',
                    autoComplete: 'off',
                    disabled: disableIdField,
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
                    autoComplete: 'off',
                    multiline: true,
                    rows: 2
                }}
            />
        </Stack>
    )
}
