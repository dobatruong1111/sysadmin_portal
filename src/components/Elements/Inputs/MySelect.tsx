import { Select, SelectProps, styled } from "@mui/material";

const StyledSelect = styled('div')``;

export type MySelectProps = Omit<SelectProps, 'size'> & {
    size?: SelectProps['size'];
}
export const MySelect = (props: MySelectProps) => {
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
