import { styled, TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';

const StyledTextField = styled(TextField)`
    width: 350px;
    height: 42px;
    font-size: 14px;
    & label.Mui-focused {
        color: #0e8a72;
    }
    & .MuiOutlinedInput-root {
        &.Mui-focused fieldset {
            border-color: #0e8a72;
        }
    }
`;

export const MyTextField = forwardRef<HTMLDivElement, TextFieldProps>((props, ref) => {
    return <StyledTextField ref={ref} {...props} />;
});