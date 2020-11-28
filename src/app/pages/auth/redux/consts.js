import { NSP_AUTH } from 'app/consts';

export const KEY_REDUCER_SAGA = 'authReducer';

export const LOGIN_CALL = `${NSP_AUTH}LOGIN_CALL`;
export const LOGIN_CALL_FAILED = `${NSP_AUTH}LOGIN_CALL_FAILED`;
export const LOGIN_CALL_SUCCEEDED = `${NSP_AUTH}LOGIN_CALL_SUCCEEDED`;
export const LOGOUT_CALL = `${NSP_AUTH}LOGOUT_CALL`;
export const LOGOUT_CALL_SUCCEEDED = `${NSP_AUTH}LOGOUT_CALL_SUCCEEDED`;

export const FIELDS_STATE = {
    USER_INFO: 'userInfo',
    ERROR: 'error',
    LOADING: 'loading',
};
