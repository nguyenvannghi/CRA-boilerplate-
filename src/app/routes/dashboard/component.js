import AsyncComponent from 'app/components/@common/asyncComponent';

const AsyncLogin = AsyncComponent(() => import('app/pages/auth/login'));
const AsyncDashboard = AsyncComponent(() => import('app/pages/dashboard'));

export { AsyncLogin, AsyncDashboard };
