import { useState } from "react";
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { DomainDTOUpdate } from "../../../../types/dto/domain"
import { useUpdateDomainMutation } from "../../api/apiDomain";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";
import { useDispatch, useSelector } from "react-redux";
import { UseFormProps } from "react-hook-form";
import { TABLE_DOMAIN, TABLE_HOSPITAL } from "../../../../stores/table/tableInitialState";
import { setSelectedRow } from "../../../../stores/table/tableSlice";
import { MyFormGroupUnstyled, MyFormTextField } from "../../../../components";
import { useGetHospitalListQuery } from "../../api/apiHospital";
import { skipToken } from "@reduxjs/toolkit/query";
import { MenuItem, Stack, Typography } from "@mui/material";
import { MyFormSelectField } from "../../../../components/Elements/Inputs/MyFormSelectField";
import { MyFormCheckboxField } from "../../../../components/Elements/Inputs/MyFormCheckboxField";

export type DomainEditFormProps = {
    onSuccessCallback?: () => void,
    record: DomainDTOUpdate
}

export const DomainEditForm = (props: DomainEditFormProps) => {
    const { onSuccessCallback, record } = props;
    const register = useRegisterAdminFunctions();
    const [errorMessage, setErrorMessage] = useState<string>();
    const [editDomain] = useUpdateDomainMutation();
    const notifySnackbar = useNotifySnackbar();
    const dispatch = useDispatch();

    const query = useSelector((state: any) => state.tableReducer.data[TABLE_HOSPITAL].query);
    const { data } = useGetHospitalListQuery(query || skipToken);

    const formOptions: UseFormProps<DomainDTOUpdate> = {
        mode: 'onChange',
        defaultValues: {
            id: record.id,
            hospitalID: record.hospitalID,
            publicAddress: record.publicAddress,
            preferred: record.preferred
        }
    }

    const onSubmit = async (formData: DomainDTOUpdate) => {
        const submitForm: DomainDTOUpdate = {
            id: formData.id ?? '',
            hospitalID: formData.hospitalID ?? '',
            publicAddress: formData.publicAddress ?? false,
            preferred: formData.preferred ?? false
        }
        if (submitForm.hospitalID.length === 0) setErrorMessage('Trường bắt buộc không được bỏ trống');
        else {
            const result = await editDomain(submitForm);
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
                dispatch(setSelectedRow({
                    tableId: TABLE_DOMAIN,
                    selectedRow: null
                }))
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
                            disabled: true
                        }}
                    />
                    <MyFormSelectField
                        name="hospitalID"
                        control={control}
                        MySelectProps={{
                            label: "Hospital ID",
                            size: 'small',
                            fullWidth: true,
                            disabled: true
                        }}
                        required={true}
                    >
                        {(data?.list || []).map((item) => (
                            <MenuItem key={item.id} value={item.id}>
                                {item.id}
                            </MenuItem>
                        ))}
                    </MyFormSelectField>
                    <Stack spacing={5} direction='row' alignItems='center'>
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
                        <Stack spacing={1} direction='row' alignItems='center'>
                            <MyFormCheckboxField
                                name="preferred"
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
            )}
        />
    )
}
