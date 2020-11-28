import { createSelector } from 'reselect';
import { KEY_REDUCER_SAGA, FIELDS_STATE } from './consts';
import { initState } from './reducer';

const authSelector = (state) => state[KEY_REDUCER_SAGA] || initState;

// eslint-disable-next-line import/prefer-default-export
export const makeSelectUserInfo = () => createSelector(authSelector, (item) => item[FIELDS_STATE.USER_INFO]);
