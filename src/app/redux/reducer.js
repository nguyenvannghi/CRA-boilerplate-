import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
import history from 'app/routes/history';
import commonReducer from 'app/redux/common/reducer';
import { KEY_REDUCER_SAGA } from 'app/redux/common/consts';
import authReducer from 'app/pages/auth/redux/reducer';
import * as nameAuthConsts from 'app/pages/auth/redux/consts';

// const masterDataPersistConfig = {
//     key: 'auth',
//     storage,
//     whitelist: [
//         // input state name
//     ],
// };

const rootReducer = (asyncReducers = {}) => {
    return combineReducers({
        router: connectRouter(history),
        [KEY_REDUCER_SAGA]: commonReducer,
        [nameAuthConsts.KEY_REDUCER_SAGA]: authReducer,
        // [nameMasterDataConsts.KEY_REDUCER_SAGA]: persistReducer(masterDataPersistConfig, masterDataReducer),
        ...asyncReducers,
    });
};

export default rootReducer;
