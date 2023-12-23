import { useState } from "react";
import { useRegisterAdminFunctions } from "../../../../providers/admin/AdminProvider";
import { DomainDTOUpdate } from "../../../../types/dto/domain"
import { useUpdateDomainMutation } from "../../api/apiDomain";
import { useNotifySnackbar } from "../../../../providers/NotificationProvider";
import { useDispatch, useSelector } from "react-redux";
import { UseFormProps } from "react-hook-form";
import { TABLE_DOMAIN, TABLE_HOSPITAL } from "../../../../stores/table/tableInitialState";
import { setSelectedRow } from "../../../../stores/table/tableSlice";
import { MyFormGroupUnstyled } from "../../../../components";
import { DomainFormFields } from "./DomainFormFields";
import { useGetHospitalListQuery } from "../../api/apiHospital";
import { skipToken } from "@reduxjs/toolkit/query";

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
    console.log(record);

    const query = useSelector((state: any) => state.tableReducer.data[TABLE_HOSPITAL].query);
    const { data } = useGetHospitalListQuery(query || skipToken);

    const formOptions: UseFormProps<DomainDTOUpdate> = {
        mode: 'onChange',
        defaultValues: {
            id: record.id,
            hospitalID: record.hospitalID,
            publicAddress: record.publicAddress
        }
    }

    const onSubmit = async (formData: DomainDTOUpdate) => {
        const submitForm: DomainDTOUpdate = {
            id: formData.id ?? '',
            hospitalID: formData.hospitalID ?? '',
            publicAddress: formData.publicAddress ?? false
        }
        if (submitForm.hospitalID.length === 0) setErrorMessage('Trường bắt buộc không được bỏ trống');
        else {
            // const result = await editDomain(submitForm);
            // if ('error' in result) {
            //     notifySnackbar({
            //         message: 'Lỗi',
            //         options: {
            //             variant: 'error'
            //         }
            //     })
            // } else {
            //     notifySnackbar({
            //         message: 'Thành công',
            //         options: {
            //             variant: 'success'
            //         }
            //     })
            //     dispatch(setSelectedRow({
            //         tableId: TABLE_DOMAIN,
            //         selectedRow: null
            //     }))
            //     onSuccessCallback && onSuccessCallback();
            // }
            console.log(formData);
        }
    }

    return (
        <MyFormGroupUnstyled
            registerFormFunctions={(formInstance) => register('submitEditForm', () => formInstance.submit && formInstance.submit())}
            onSubmit={onSubmit}
            submitOnEnter={true}
            formOptions={formOptions}
            renderInputs={({control}) => (
                <DomainFormFields
                    control={control}
                    errorMessage={errorMessage}
                    disableIdField={true}
                    hospitals={data?.list}
                />
            )}
        />
    )
}
