function WebWorker() {
    this.onmessage = (e) => {
        const {
            data: { url, method, token, params },
        } = e;

        const fetchParams = {
            method: method || 'GET',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
                Authorization: token,
            },
        };
        if (params) {
            fetchParams.body = JSON.stringify(params);
        }

        fetch(url, fetchParams)
            .then((response) => {
                return response.blob();
            })
            .then((ref) => {
                postMessage(ref);
            })
            .catch((e) => e);
    };
}

export default class WebWorkerEnabler {
    constructor() {
        let code = WebWorker.toString();
        code = code.substring(code.indexOf('{') + 1, code.lastIndexOf('}'));

        const blob = new Blob([code], { type: 'application/javascript' });
        return new Worker(URL.createObjectURL(blob));
    }
}
