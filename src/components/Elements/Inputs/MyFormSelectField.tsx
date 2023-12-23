import { Control, Controller, FieldPath, FieldValues } from "react-hook-form"
import { MySelect, MySelectProps } from "./MySelect";
import { ReactNode } from "react";
import { FormControl } from "@mui/material";

export type MyFormSelectFieldProps<T extends FieldValues> = {
    name: FieldPath<T>;
    control: Control<T>;
    MySelectProps?: MySelectProps;
    children?: ReactNode;
    required?: boolean;
}

export function MyFormSelectField<T extends FieldValues>(
    props: MyFormSelectFieldProps<T>
) {

    return (
        <Controller
            name={props.name}
            control={props.control}
            render={( { field: { ref, ...fieldWithoutRef } }) => (
                <FormControl fullWidth required={props?.required}>
                    <MySelect
                        {...props.MySelectProps}
                    >
                        {props.children}
                    </MySelect>
                </FormControl>
            )}
        />
    )
}
