import React, { Fragment, useEffect, useState } from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import jwtDecode from 'jwt-decode';

import { PrivateLayout, PublicLayout } from 'app/layouts';
import history from 'app/routes/history';
import LocalStorageServices from 'app/utils/localStorage';
import { readCookie, eraseCookie } from 'app/utils/cookieStorage';
import { makeSelectUserInfo } from 'app/pages/auth/redux/selectors';
import { AUTH_USER, LAYOUT_TYPE } from 'app/consts';
import { RouterApp } from './consts';
import { routeAppConfig, routeForAuthConfig } from './routeConfig';

const isAuthenticated = () => {
    let hasAuthenticated = false;
    if (readCookie(AUTH_USER.ACCESS_TOKEN)) {
        try {
            const accessToken = jwtDecode(readCookie(AUTH_USER.ACCESS_TOKEN));
            const currentTime = new Date().getTime() / 1000;
            if (currentTime > accessToken.exp) {
                hasAuthenticated = false;
            } else {
                hasAuthenticated = true;
            }
        } catch (error) {
            hasAuthenticated = false;
        }
    } else {
        LocalStorageServices.removeAll();
        eraseCookie(AUTH_USER.ACCESS_TOKEN);
    }
    return hasAuthenticated;
};

const AppRoutes = () => {
    const [hasAuthenticated, setAuthenticated] = useState(isAuthenticated());
    const userInfo = useSelector(makeSelectUserInfo());
    const routesMatch = [];

    useEffect(() => {
        if (userInfo) {
            setAuthenticated(isAuthenticated());
        }
    }, [userInfo]);

    useEffect(() => {
        if (!hasAuthenticated) {
            LocalStorageServices.removeAll();
        }
    }, [hasAuthenticated]);

    const onceRouter = (route) => {
        const { component: Component, layout, path, exact, strict, redirect } = route;
        const LayoutWapper = layout === LAYOUT_TYPE.PRIVATE ? PrivateLayout : PublicLayout;
        return Component ? (
            <Route
                key={Math.random().toString(36).substr(2, 5)}
                path={path}
                exact={exact}
                strict={strict}
                render={(props) => (
                    <>
                        <LayoutWapper>
                            <Component {...props} />
                        </LayoutWapper>
                        {redirect && <Redirect from={path} to={redirect} />}
                    </>
                )}
            />
        ) : (
            <Fragment key={Math.random().toString(36).substr(2, 5)}>No Component Imported</Fragment>
        );
    };

    const routerListNav = (data) => {
        data.forEach((route) => {
            if (Object.prototype.hasOwnProperty.call(route, 'children')) {
                const { children, path } = route;
                routerListNav(children);
                if (path) {
                    routesMatch.push(onceRouter(route));
                }
            } else {
                route.path && routesMatch.push(onceRouter(route));
            }
        });
        return routesMatch;
    };

    return (
        <ConnectedRouter history={history}>
            {!hasAuthenticated ? (
                <>
                    <Switch>
                        {routerListNav(routeForAuthConfig)}
                        <Redirect to={RouterApp.rLogin} />
                    </Switch>
                </>
            ) : (
                <>
                    <Switch>
                        {routerListNav(routeAppConfig)}
                        <Redirect path="*" to={RouterApp.rDashboard} />
                    </Switch>
                </>
            )}
        </ConnectedRouter>
    );
};

export default AppRoutes;
