/* eslint-disable no-unused-vars */
import { put, take, call, fork, all } from 'redux-saga/effects';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import { AUTH_USER } from 'app/consts';
import { parseResponse } from 'app/services/parseResponse';
import LocalStorageKey from 'app/utils/localStorage';
import { createCookie, eraseCookie } from 'app/utils/cookieStorage';
import { loadingOpen, loadingClose } from 'app/redux/common/actions';
import { RouterApp } from 'app/routes/consts';
import { loginApi } from './api';
import * as nameEvents from './actions';
import * as nameConst from './consts';

const data = {
    access_token:
        // eslint-disable-next-line max-len
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1VzZWQiOnRydWUsIl9pZCI6IjVlYWNhMmQxODdmN2Q3MmY4MDk3NjI2MiIsImZpcn' +
        'N0TmFtZSI6Ik5naGkiLCJsYXN0TmFtZSI6Ik5ndXllbiIsImVtYWlsIjoibmdoaUBnbWFpbC5jb20iLCJwaG9uZSI6IjEyMzQ1Njc4OSIsI' +
        'nRheElkZW50aWZpY2F0aW9uTnVtYmVyIjoiMTIzNDU2Nzg5IiwiZGVwYXJ0bWVudCI6IldBUkVIT1VTRSIsInBvc2l0aW9uIjoiTUFOQUdF' +
        'UiIsInR5cGUiOiJBRE1JTiIsImNyZWF0ZWRBdCI6IjIwMjAtMDUtMDFUMjI6Mjk6MzcuNzY0WiIsInVwZGF0ZWRBdCI6IjIwMjAtMDUtMDFUM' +
        'jI6Mjk6MzcuNzY0WiIsIl9fdiI6MCwiaWQiOiI1ZWFjYTJkMTg3ZjdkNzJmODA5NzYyNjIiLCJpYXQiOjE2MDUyNTk0NzQsImV4cCI6MTYwNj' +
        'EyMzQ3NH0.Gq7c_GyB - Q8Q8SbzErSXGQtz1pdU - MEht6chze2dG_U',
    isUsed: true,
    _id: '5eaca2d187f7d72f80976262',
    firstName: 'Nghi',
    lastName: 'Nguyen',
    email: 'nghi@gmail.com',
    phone: '123456789',
    taxIdentificationNumber: '123456789',
    department: 'WAREHOUSE',
    position: 'MANAGER',
    type: 'ADMIN',
    createdAt: '2020-05-01T22:29:37.764Z',
    updatedAt: '2020-05-01T22:29:37.764Z',
    __v: 0,
    id: '5eaca2d187f7d72f80976262',
};

function* loginSaga() {
    while (true) {
        const {
            payload: { email, password },
        } = yield take(nameConst.LOGIN_CALL);
        yield put(loadingOpen());
        // const result = yield call(loginApi, email, password);
        // const data = parseResponse(result);
        if (data && data.errorMess) {
            toast.error('Đăng nhập thất bại.', {
                position: 'top-right',
            });
            yield put(nameEvents.onLoginFailed('Đăng nhập thất bại'));
        } else if (!isEmpty(data)) {
            const { access_token: accessToken, department, email, firstName, id, lastName, phone, position, taxIdentificationNumber, type } = data;
            createCookie(AUTH_USER.ACCESS_TOKEN, accessToken);
            LocalStorageKey.setItemJson(AUTH_USER.CURRENT_USER, {
                department,
                email,
                firstName,
                id,
                lastName,
                phone,
                position,
                taxIdentificationNumber,
                type,
            });
            yield put(
                nameEvents.onLoginSucceeded({
                    department,
                    email,
                    firstName,
                    id,
                    lastName,
                    phone,
                    position,
                    taxIdentificationNumber,
                    type,
                }),
            );
        }
        yield put(loadingClose());
    }
}

function* logoutSaga() {
    while (true) {
        yield take(nameConst.LOGOUT_CALL);
        LocalStorageKey.removeAll();
        eraseCookie(AUTH_USER.ACCESS_TOKEN);

        yield put(nameEvents.onLogoutSucceeded());
        window.location.href = RouterApp.rLogin;
    }
}

export default function* root() {
    yield all([fork(loginSaga), fork(logoutSaga)]);
}
