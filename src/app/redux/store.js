import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';
import { createInjectorsEnhancer } from 'redux-injectors';
import ENV, { envNameConfig } from 'configs';
import createReducer from 'app/redux/reducer';
import rootSaga from 'app/redux/saga';
import history from 'app/routes/history';

export const rootPersistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
};

const storeConfig = (preloadedState) => {
    let reduxSagaMonitorOptions = {};
    // Dev Tools once it supports redux-saga version 1.x.x
    if (window.__SAGA_MONITOR_EXTENSION__) {
        reduxSagaMonitorOptions = {
            sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
        };
    }

    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const routesMiddleware = routerMiddleware(history);

    const middlewares = [sagaMiddleware, routesMiddleware];

    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga: sagaMiddleware.run,
        }),
    ];
    const store = configureStore({
        reducer: createReducer(),
        preloadedState,
        middleware: [...getDefaultMiddleware({ serializableCheck: false }), ...middlewares],
        enhancers,
        devTools: ENV !== envNameConfig.PRODUCTION,
    });
    const persistor = persistStore(store);

    sagaMiddleware.run(rootSaga);

    return { store, persistor };
};

export default storeConfig;
