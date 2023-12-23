import { Select, SelectProps, styled } from "@mui/material";

const StyledSelect = styled('div')``;

export type MySelectProps<T> = Omit<SelectProps<T>, 'size'> & {
    size?: SelectProps['size'];
}
export const MySelect = <T,>(props: MySelectProps<T>) => {
    const { size } = props;
    return (
        <StyledSelect>
            <Select
                {...props}
                size={size}
            />
        </StyledSelect>
    )
}
