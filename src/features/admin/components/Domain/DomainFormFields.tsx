import { Control } from "react-hook-form";
import { DomainDTOCreate } from "../../../../types/dto/domain";
import { Stack, Typography } from "@mui/material";
import { MyFormTextField } from "../../../../components";
import { MyFormCheckboxField } from "../../../../components/Elements/Inputs/MyFormCheckboxField";

export type DomainFormFieldsProps = {
    control: Control<DomainDTOCreate>;
    errorMessage: string | undefined;
    disableIdField: boolean;
}

export const DomainFormFields = (props: DomainFormFieldsProps) => {
    const { control, errorMessage, disableIdField } = props;
    return (
        <Stack spacing={1} alignItems='center'>
            <div style={{height: '20px'}}>{errorMessage && <Typography fontSize='12px' color='red'>{errorMessage}</Typography>}</div>
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
                    disabled: disableIdField
                }}
            />
            <Stack spacing={1} direction='row' alignItems='center'>
                <MyFormCheckboxField
                    name="publicAddress"
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
                <Typography sx={{fontSize: '15px', fontWeight: '400'}}>Địa chỉ public</Typography>
            </Stack>
        </Stack>
    )
}
