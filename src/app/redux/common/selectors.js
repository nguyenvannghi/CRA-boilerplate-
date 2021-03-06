import { createSelector } from 'reselect';
import { KEY_REDUCER_SAGA, FIELDS_STATE } from './consts';
import { initState } from './reducer';

const commonSelector = (state) => state[KEY_REDUCER_SAGA] || initState;

export const makeSelectSidebarToggle = () => createSelector(commonSelector, (item) => item[FIELDS_STATE.SIDEBAR_TOGGLE]);
export const makeSelectActionConfirm = () => createSelector(commonSelector, (item) => item[FIELDS_STATE.ACTION_CONFIRM]);
export const makeSelectLoading = () => createSelector(commonSelector, (item) => item[FIELDS_STATE.IS_LOADING]);
