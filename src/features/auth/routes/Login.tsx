import { AuthLayout } from '../components';
import { LoginBlock } from '../components';

export function Login() {
    return (
        <AuthLayout>
            <LoginBlock onSuccess={() => alert("Đăng nhập thành công")}/>
        </AuthLayout>
    );
}