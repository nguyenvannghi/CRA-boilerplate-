import * as Yup from 'yup';
import FIELD_LOGIN from './consts';

const LoginSchema = Yup.object().shape({
    [FIELD_LOGIN.EMAIL]: Yup.string().required('Email bắt buộc').email('Email không hợp lệ'),
    [FIELD_LOGIN.PASSWORD]: Yup.string().required('Mật khẩu bắt buộc'),
    [FIELD_LOGIN.REMEMBER]: Yup.bool(),
});
export default LoginSchema;
