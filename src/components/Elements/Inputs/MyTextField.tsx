import { styled, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

const StyledTextField = styled(TextField)`
    width: 350px;
    height: 42px;
`;

export const MyTextField = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
    return <StyledTextField ref={ref} {...props}/>;
});