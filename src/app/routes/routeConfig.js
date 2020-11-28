import dashboardRouteConfig from 'app/routes/dashboard/router';
import authRouteConfig from 'app/routes/auth/router';

const routeAppConfig = [...dashboardRouteConfig];

const routeForAuthConfig = [...authRouteConfig];

export { routeAppConfig, routeForAuthConfig };
