import { MSG } from 'app/consts';

const mergeError = (data) => {
    if (!data || typeof data !== 'object') {
        return MSG.NETWORK_ERROR;
    }
    const messMerged = [];
    data.forEach((item) => {
        const m = `🚀 ${item.key}: ${item.message}\n\n`;
        messMerged.push(m);
    });
    return messMerged.join('');
};

export const parseResponse = (resp) => {
    if (!resp) {
        return {
            status: 500,
            errMess: 'Status: 500 (Internal server error), Backend or DevOps help me!',
        };
    }
    const { status, data } = resp;
    if (status === 200 || status === 201) {
        return data;
    }
    let err = '';
    if (typeof data?.message === 'object') {
        err = mergeError(data?.message);
    } else {
        err = data?.message;
    }

    return {
        errorMess: err || MSG.NETWORK_ERROR,
        errorCode: data.errorCode,
        statusCode: data.statusCode,
    };
};

export const parseErr = (err) => {
    return { errMess: err.message || 'Empty' };
};
