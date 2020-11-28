const env = process.env.REACT_APP_ENV;

export const envNameConfig = {
    DEVELOPMENT: 'development',
    STAGING: 'staging',
    UAT: 'uat',
    PRODUCTION: 'production',
};

const listConfigs = {
    [envNameConfig.DEVELOPMENT]: {
        API_SERVER: 'http://210.245.20.199:3001/api/',
    },
    [envNameConfig.STAGING]: {
        API_SERVER: 'http://210.245.20.199:3001/api/',
    },
    [envNameConfig.UAT]: {
        API_SERVER: 'http://210.245.20.199:3001/api/',
    },
    [envNameConfig.PRODUCTION]: {
        API_SERVER: 'http://210.245.20.199:3000/api/',
    },
};

export const Config = listConfigs[env];
export default env;
