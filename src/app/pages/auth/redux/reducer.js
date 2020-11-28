import { createReducer } from '@reduxjs/toolkit';
import * as nameActs from './actions';
import { FIELDS_STATE } from './consts';

export const initState = {
    [FIELDS_STATE.LOADING]: false,
    [FIELDS_STATE.USER_INFO]: null,
    [FIELDS_STATE.ERROR]: null,
};

const authReducer = createReducer(initState, {
    [nameActs.onLoginCall]: (state) => {
        state[FIELDS_STATE.LOADING] = true;
    },
    [nameActs.onLoginSucceeded]: (state, action) => {
        const { payload } = action;
        state[FIELDS_STATE.USER_INFO] = payload;
        state[FIELDS_STATE.ERROR] = initState[FIELDS_STATE.ERROR];
        state[FIELDS_STATE.LOADING] = false;
    },
    [nameActs.onLoginFailed]: (state, action) => {
        const { payload } = action;
        state[FIELDS_STATE.USER_INFO] = initState[FIELDS_STATE.USER_INFO];
        state[FIELDS_STATE.ERROR] = payload;
        state[FIELDS_STATE.LOADING] = false;
    },
});

export default authReducer;
