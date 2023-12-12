import { 
  StyledLoginContainer, 
  StyledLoginLogo, 
  StyledLoginButton, 
  StyledLoginForm, 
  StyledMessage
} from './LoginBlock.styles';
import logo from '../assets/logo.png';
import { MyFormTextField } from '../../../components';
import { MyPasswordForm } from '../../../components';
import { LoginCredentialsDTO } from '../types';
import { UseFormProps } from 'react-hook-form';
import { useState } from 'react';
import { DEFAULT_USERNAME, DEFAULT_PASSWORD, TECHNICAL_SUPPORT } from '../../../config';
import { Typography } from '@mui/material';

type LoginBlockProps = {
  onSuccess: () => void;
}

export const LoginBlock = ({ onSuccess }: LoginBlockProps) => {
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const formOptions: UseFormProps<LoginCredentialsDTO> = {
    mode: 'onChange',
    defaultValues: {
      username: DEFAULT_USERNAME,
      password: DEFAULT_PASSWORD
    }
  }

  const onSubmit = async (data: LoginCredentialsDTO) => {
    if (data.username === DEFAULT_USERNAME && data.password === DEFAULT_PASSWORD) {
      onSuccess();
    } else {
      setErrorMessage("Đăng nhập không thành công");
    }
  }

  return (
    <StyledLoginContainer>
      <StyledLoginLogo>
        <img src={logo} style={{width: "100%", height: "100%"}} alt="logo"/>
      </StyledLoginLogo>
      <StyledMessage>
        <Typography fontSize={14}>{errorMessage}</Typography>
      </StyledMessage>
      <StyledLoginForm<LoginCredentialsDTO>
        onSubmit={onSubmit}
        submitOnEnter={true}
        formOptions={formOptions}
        renderInputs={({onKeyDown, control}) => (
          <>
            <MyFormTextField
              name='username'
              control={control}
              MyTextFieldProps={{
                label: 'Tên người dùng',
                placeholder: 'Tên người dùng',
                fullWidth: true,
                required: true,
                size: 'small',
                onKeyDown
              }}
            />
            <MyPasswordForm
              name='password'
              control={control}
              MyTextFieldProps={{
                label: 'Mật khẩu',
                placeholder: 'Mật khẩu',
                fullWidth: true,
                required: true,
                size: 'small',
                onKeyDown
              }}
            />
          </>
        )}
        renderSubmit={({submit}) => (
          <StyledLoginButton 
            variant='text'
            size='small'
            onClick={submit}
          >
            Đăng nhập
          </StyledLoginButton>
        )}
      />
      <Typography fontSize={14} fontWeight={400}>Hỗ trợ kỹ thuật: {TECHNICAL_SUPPORT}</Typography>
    </StyledLoginContainer>);
}