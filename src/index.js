import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';
import store from 'app/redux/store';
import AppRoutes from 'app/routes';
import AppLoading from 'app/components/@common/appLoading';
import { DialogAlerContainer } from 'app/components/@common/dialogAlert';
import { LoaderPercentProgressContainer } from 'app/components/@common/progressLoader';
import { LightViewerContainer } from 'app/components/@common/lightBoxComponent';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import './styles/index.scss';

import reportWebVitals from './reportWebVitals';

ReactDOM.render(
    <Provider store={store().store}>
        {/* <PersistGate loading={<>Loading...</>} persistor={store().persistor}> */}
        <AppLoading />
        <DialogAlerContainer />
        <LoaderPercentProgressContainer />
        <LightViewerContainer />
        <AppRoutes />
        {/* </PersistGate> */}
    </Provider>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
