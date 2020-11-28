/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import logoLight from 'assets/images/logo.png';
import logoDark from 'assets/images/logo-dark.png';
import { onLoginCall } from 'app/pages/auth/redux/actions';
import FIELD_LOGIN from './consts';
import LoginSchema from './validator';

const LoginPage = () => {
    const dispatch = useDispatch();
    const [isShow, setShow] = useState(false);
    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(LoginSchema),
    });

    const handleLogin = (data) => {
        dispatch(onLoginCall(data));
    };

    const handleShowHidePassword = () => {
        setShow(() => !isShow);
    };

    return (
        <>
            <div className="auth-fluid-form-box">
                <div className="align-items-center d-flex h-100">
                    <div className="card-body">
                        <div className="auth-brand text-center text-lg-left">
                            <Link to="/" className="logo-dark">
                                <span>
                                    <img src={logoDark} alt="" height="18" />
                                </span>
                            </Link>
                            <Link to="/" className="logo-light">
                                <span>
                                    <img src={logoLight} alt="" height="18" />
                                </span>
                            </Link>
                        </div>
                        <h2 className="mt-0">Đăng Nhập</h2>
                        <p className="text-muted mb-4">Vui lòng nhập thông tin dưới đây để truy cập vào tài khoản!</p>
                        <Form onSubmit={handleSubmit(handleLogin)}>
                            <Form.Group controlId={FIELD_LOGIN.EMAIL}>
                                <Form.Label>Email</Form.Label>
                                <input ref={register} className="form-control" type="email" id={FIELD_LOGIN.EMAIL} name={FIELD_LOGIN.EMAIL} placeholder="Nhập email" />
                                <ErrorMessage errors={errors} name={FIELD_LOGIN.EMAIL} as="div" className="invalid-feedback d-block" />
                            </Form.Group>
                            <Form.Group controlId={FIELD_LOGIN.PASSWORD}>
                                <Form.Label>Password</Form.Label>
                                <InputGroup>
                                    <input
                                        ref={register}
                                        className="form-control"
                                        type={isShow ? 'text' : 'password'}
                                        id={FIELD_LOGIN.PASSWORD}
                                        name={FIELD_LOGIN.PASSWORD}
                                        placeholder="Nhập mật khẩu"
                                    />
                                    <InputGroup.Prepend>
                                        <InputGroup.Text className="pointer" onClick={handleShowHidePassword}>
                                            <i className={classNames({ 'uil uil-eye-slash': isShow, 'uil uil-eye': !isShow })} />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                                <ErrorMessage errors={errors} name={FIELD_LOGIN.PASSWORD} as="div" className="invalid-feedback d-block" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="checkbox-signin" />
                                    <label className="custom-control-label" htmlFor="checkbox-signin">
                                        Remember me
                                    </label>
                                </div>
                            </Form.Group>
                            <Form.Group className="mb-0 text-center">
                                <Button variant="primary" className="btn-block" type="submit">
                                    <i className="mdi mdi-login" /> Log In{' '}
                                </Button>
                            </Form.Group>
                        </Form>
                        <footer className="footer footer-alt">
                            <p className="text-muted">
                                Bạn chưa có tài khoản?{' '}
                                <Link to="/" className="text-muted ml-1">
                                    <b>Đăng ký ngay</b>
                                </Link>
                            </p>
                        </footer>
                    </div>
                </div>
            </div>
            <div className="auth-fluid-right text-center">
                <div className="auth-user-testimonial">
                    <h2 className="mb-3">I love the color!</h2>
                    <p className="lead">
                        <i className="mdi mdi-format-quote-open" />
                        It is a elegent templete. I love it very much!. <i className="mdi mdi-format-quote-close" />
                    </p>
                    <p>- Logistic Admin User</p>
                </div>
            </div>
        </>
    );
};

export default memo(LoginPage);
