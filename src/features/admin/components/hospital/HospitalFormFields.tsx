import { Stack, Typography } from "@mui/material"
import { MyFormTextField } from "../../../../components"
import { MyFormCheckboxField } from "../../../../components/Elements/Inputs/MyFormCheckboxField"
import { Control } from "react-hook-form"
import { HospitalDTO } from "../../../../types/dto/hospital"

export type HospitalFormFieldsProps = {
    control: Control<HospitalDTO>;
    errorMessage: string | undefined;
    disableIdField: boolean;
}

export const HospitalFormFields = (props: HospitalFormFieldsProps) => {
    const { control, errorMessage, disableIdField } = props;
    return (
        <Stack spacing={1} alignItems='center'>
            <div style={{height: '20px'}}>{errorMessage && <Typography fontSize='12px' color='red'>{errorMessage}</Typography>}</div>
            <Stack direction='row' spacing={1}>
                <Stack spacing={1} alignItems='center'>
                    <MyFormTextField
                        name="id"
                        control={control}
                        MyTextFieldProps={{
                            label: 'ID',
                            placeholder: 'ID',
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
                            label: 'Tên bệnh viện',
                            placeholder: 'Tên bệnh viện',
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
                            rows: 3
                        }}
                    />
                </Stack>
                <Stack spacing={1} alignItems='center'>
                    <MyFormTextField
                        name="phone"
                        control={control}
                        MyTextFieldProps={{
                            type: 'tel',
                            label: 'Số điện thoại',
                            placeholder: 'Số điện thoại',
                            fullWidth: true,
                            size: 'small',
                            autoComplete: 'off'
                        }}
                    />
                    <MyFormTextField
                        name="email"
                        control={control}
                        MyTextFieldProps={{
                            label: 'Địa chỉ email',
                            placeholder: 'Địa chỉ email',
                            fullWidth: true,
                            size: 'small',
                            autoComplete: 'off'
                        }}
                    />
                    <MyFormTextField
                        name="address"
                        control={control}
                        MyTextFieldProps={{
                            label: 'Địa chỉ',
                            placeholder: 'Địa chỉ',
                            fullWidth: true,
                            size: 'small',
                            autoComplete: 'off'
                        }}
                    />
                    <Stack spacing={1} direction='row' alignItems='center'>
                        <MyFormCheckboxField
                            name="enabled"
                            control={control}
                            MyCheckboxProps={{
                                size: 'small',
                                color: 'success',
                                sx: {
                                    '&.Mui-checked': {
                                        color: '#0e8a72'
                                    }
                                }
                            }}
                        />
                        <Typography sx={{fontSize: '15px', fontWeight: '400'}}>Ưu tiên</Typography>
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    )
}
