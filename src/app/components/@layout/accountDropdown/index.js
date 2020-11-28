import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import LocalStorageServices from 'app/utils/localStorage';
import { AUTH_USER } from 'app/consts';
import { RouterApp } from 'app/routes/consts';
import { onLogoutCall } from 'app/pages/auth/redux/actions';
import userAvatar from 'assets/images/user.png';

const AccountDropdown = () => {
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState(null);

    useEffect(() => {
        if (LocalStorageServices.getItemJson(AUTH_USER.CURRENT_USER)) {
            setUserInfo(LocalStorageServices.getItemJson(AUTH_USER.CURRENT_USER));
        }
        return () => {};
    }, []);

    const onLogout = useCallback(() => {
        dispatch(onLogoutCall());
    }, [dispatch]);

    return (
        <Dropdown as="li" bsPrefix="dropdown notification-list">
            <Dropdown.Toggle as="a" className="nav-link dropdown-toggle nav-user arrow-none mr-0 pointer" role="button" id="dropdown-user">
                <span className="account-user-avatar">
                    <img src={userAvatar} alt={userInfo ? `${userInfo?.lastName} ${userInfo?.firstName}` : 'No name'} className="rounded-circle" />
                </span>
                <span>
                    <span className="account-user-name">{userInfo ? `${userInfo?.lastName} ${userInfo?.firstName}` : 'No name'}</span>
                    <span className="account-position">{userInfo?.position || 'No position'}</span>
                </span>
            </Dropdown.Toggle>
            <Dropdown.Menu bsPrefix="dropdown-menu dropdown-menu-right dropdown-menu-animated topbar-dropdown-menu profile-dropdown">
                <Dropdown.Header bsPrefix="dropdown-header noti-title">
                    <h6 className="text-overflow m-0">Xin chào !</h6>
                </Dropdown.Header>
                <Dropdown.Item as={Link} to={`${RouterApp.rAccount}/${userInfo?.id}`} bsPrefix="dropdown-item notify-item">
                    <i className="mdi mdi-account-circle mr-1" />
                    Thông tin cá nhân
                </Dropdown.Item>
                <Dropdown.Item onClick={onLogout} bsPrefix="dropdown-item notify-item">
                    <i className="mdi mdi-logout mr-1" />
                    Đăng xuất
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

AccountDropdown.defaultProps = {};

AccountDropdown.propTypes = {};

export default memo(AccountDropdown);
