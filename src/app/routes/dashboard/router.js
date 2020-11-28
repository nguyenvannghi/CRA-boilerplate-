import { LAYOUT_TYPE } from 'app/consts';
import { RouterApp } from 'app/routes/consts';
import { AsyncDashboard } from 'app/routes/dashboard/component';

const dashboardRouteConfig = [
    {
        title: 'Dashboard',
        icon: 'uil-home-alt',
        path: RouterApp.rDashboard,
        redirect: `${RouterApp.rDashboard}/bill-statistics`,
        exact: true,
        layout: LAYOUT_TYPE.PRIVATE,
        component: AsyncDashboard,
        children: [
            {
                title: 'Dashboard',
                icon: 'fa fa-arrow-circle-right',
                path: `${RouterApp.rDashboard}`,
                layout: LAYOUT_TYPE.PRIVATE,
                component: AsyncDashboard,
            },
        ],
    },
    {
        title: 'Demo',
        icon: 'uil-home-alt',
        path: 'demo',
        redirect: `${RouterApp.rDashboard}/bill-demo`,
        exact: true,
        layout: LAYOUT_TYPE.PRIVATE,
        component: AsyncDashboard,
        children: [
            {
                title: 'Dashboard',
                icon: 'fa fa-arrow-circle-right',
                path: 'test',
                layout: LAYOUT_TYPE.PRIVATE,
                component: AsyncDashboard,
            },
        ],
    },
];

export default dashboardRouteConfig;
