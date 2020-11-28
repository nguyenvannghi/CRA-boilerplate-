import { all, fork } from 'redux-saga/effects';
import authSaga from 'app/pages/auth/redux/saga';

export default function* rootSaga() {
    yield all([fork(authSaga)]);
}
