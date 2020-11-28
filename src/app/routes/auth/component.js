import AsyncComponent from 'app/components/@common/asyncComponent';

const AsyncNotFound = AsyncComponent(() => import('app/pages/notFound'));
const AsyncLogin = AsyncComponent(() => import('app/pages/auth/login'));
const AsyncRegister = AsyncComponent(() => import('app/pages/auth/register'));

export { AsyncLogin, AsyncRegister, AsyncNotFound };
