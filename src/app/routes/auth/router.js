import { LAYOUT_TYPE } from 'app/consts';
import { RouterApp } from 'app/routes/consts';
import { AsyncLogin, AsyncRegister, AsyncNotFound } from 'app/routes/auth/component';

const authRouteConfig = [
    {
        title: 'Login',
        path: RouterApp.rLogin,
        exact: true,
        layout: LAYOUT_TYPE.PUBLIC,
        component: AsyncLogin,
    },
    {
        title: 'Register',
        path: RouterApp.rLogin,
        exact: true,
        layout: LAYOUT_TYPE.PUBLIC,
        component: AsyncRegister,
    },
    {
        path: RouterApp.rNotFound,
        layout: LAYOUT_TYPE.PUBLIC,
        component: AsyncNotFound,
    },
];

export default authRouteConfig;
