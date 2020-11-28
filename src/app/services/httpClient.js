import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import { toast } from 'react-toastify';
import ENV, { Config, envNameConfig } from 'configs';
import { readCookie, ereaseAllCookies } from 'app/utils/cookieStorage';
import LocalStorageServices from 'app/utils/localStorage';
import { AUTH_USER, MSG } from 'app/consts';

const singleton = Symbol('key for first');
const singletonEnforcer = Symbol('key for assign');

const REQUEST_TIMEOUT = 15000;

export const requestTokenHeaders = () => {
    if (!readCookie(AUTH_USER.ACCESS_TOKEN)) {
        return null;
    }
    return {
        Authorization: `Bearer ${readCookie(AUTH_USER.ACCESS_TOKEN)}`,
    };
};

const getClient = (baseURLDomain) => {
    const baseUrl = !isEmpty(baseURLDomain) ? baseURLDomain : Config.API_SERVER;
    const options = {
        baseURL: baseUrl,
        timeout: REQUEST_TIMEOUT,
    };
    const client = axios.create(options);
    // Add a request interceptor
    client.interceptors.request.use(
        (requestConfig) => requestConfig,
        (requestError) => {
            return Promise.reject(requestError);
        },
    );

    // Add a response interceptor
    client.interceptors.response.use(
        (response) => response,
        (responseError) => {
            if (ENV === envNameConfig.PRODUCTION) {
                // to do something
            }
            if (!responseError.response) {
                toast.error(MSG.NETWORK_ERROR, {
                    position: 'top-right',
                });
                if (typeof localStorage !== 'undefined') {
                    LocalStorageServices.removeAll();
                }
                ereaseAllCookies();
                //   redirect login
            }
            const { response } = responseError;
            if (response && response.status === 401 && response?.config?.url !== 'auth/login') {
                //   redirect login
            }
            return response;
        },
    );

    return client;
};

const HttpInstance = (headerConfigs = null, baseURLDomain = null) => {
    class ApiConfig {
        constructor(enforcer) {
            if (enforcer !== singletonEnforcer) {
                throw new Error('Cannot construct singleton');
            }
            this.client = getClient(baseURLDomain);
            this.headerConfigs = headerConfigs;
            this.headers = null;
        }

        static get instance() {
            if (!this[singleton]) {
                this[singleton] = new ApiConfig(singletonEnforcer);
            }

            return this[singleton];
        }

        setJwtToken(token, type, headersConfigRequest) {
            const typeToken = type;
            let headersConfigBase = {
                'content-type': 'application/json',
                Authorization: `${typeToken} ${token}`,
            };
            if (this.headerConfigs) {
                headersConfigBase = {
                    ...headersConfigBase,
                    ...this.headerConfigs,
                    ...headersConfigRequest,
                };
            }
            this.headers = headersConfigBase;
        }

        async checkToken(headersConfigRequest) {
            if (this.headerConfigs?.notAuthorization) {
                return true;
            }
            let accessToken;
            let tokenType = '';
            if (typeof document !== 'undefined') {
                tokenType = readCookie(AUTH_USER.TOKEN_TYPE) || 'Bearer';
                accessToken = readCookie(AUTH_USER.ACCESS_TOKEN);
            }
            if (accessToken) {
                this.setJwtToken(accessToken, tokenType, headersConfigRequest);
            } else {
                const getRefreshToken = readCookie(AUTH_USER.REFRESH_TOKEN);
                if (getRefreshToken) {
                    // refresh token
                } else {
                    // logout
                    toast.error(MSG.LOGIN_FAILED);
                    if (typeof localStorage !== 'undefined') {
                        // authService.logout();
                    }
                }
            }
            return true;
        }

        async get(url, params, conf = {}, progressEvent) {
            await this.checkToken(conf);
            const paramsConfig = {
                params,
                headers: this.headers,
                ...progressEvent,
            };
            return this.client
                .get(url, paramsConfig)
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async delete(url, data, conf = {}, progressEvent) {
            await this.checkToken(conf);
            return this.client
                .delete(url, data, { headers: this.headers, ...progressEvent })
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async head(url, conf = {}, progressEvent) {
            await this.checkToken(conf);
            return this.client
                .head(url, { headers: this.headers, ...progressEvent })
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async options(url, conf = {}, progressEvent) {
            await this.checkToken(conf);
            return this.client
                .options(url, { headers: this.headers, ...progressEvent })
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async post(url, data = {}, conf = {}, progressEvent) {
            await this.checkToken(conf);
            return this.client
                .post(url, data, { headers: this.headers, ...progressEvent })
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async put(url, data = {}, conf = {}, progressEvent) {
            await this.checkToken(conf);
            return this.client
                .put(url, data, { headers: this.headers, ...progressEvent })
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }

        async patch(url, data = {}, conf = {}, progressEvent) {
            await this.checkToken(conf);
            return this.client
                .patch(url, data, { headers: this.headers, ...progressEvent })
                .then((response) => Promise.resolve(response))
                .catch((error) => Promise.reject(error));
        }
    }
    return ApiConfig.instance;
};

export default HttpInstance;
