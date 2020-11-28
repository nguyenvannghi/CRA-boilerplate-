import { AUTH_USER } from 'app/consts';

const createCookie = (cName, cValue, days = 1) => {
    // NOTE: timeStamp is from Server (3600 ~ 1 hour)
    // Tuy vao BE server return
    // let getTimeStamp = 86400; // 24 hours
    // if (timeStamp) {
    //     getTimeStamp = timeStamp;
    // }
    // const d = new Date();
    // d.setTime(d.getTime() + getTimeStamp * 1000);
    // const expires = `expires=${d.toUTCString()}`;
    let expires = '';
    if (days) {
        const date = new Date();
        const times = days * 1000 * 60 * 60 * 24;
        const expiresDate = new Date(date.getTime() + times);
        expires = `;expires=${expiresDate.toUTCString()}`;
    }
    document.cookie = `${cName}=${cValue};${expires};path=/`;
};

const readCookie = (cName) => {
    const name = `${cName}=`;
    const ca = document.cookie.split(';');
    const getLenthCa = ca.length;
    for (let i = 0; i < getLenthCa; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
};

const eraseCookie = (cName) => {
    document.cookie = `${cName}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
};

const ereaseAllCookies = () => {
    Object.values(AUTH_USER).forEach((item) => {
        eraseCookie(item);
    });
};

export { createCookie, readCookie, eraseCookie, ereaseAllCookies };
