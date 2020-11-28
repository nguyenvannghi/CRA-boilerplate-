import HttpClient from 'app/services/httpClient';

const loginApi = (email, password) => {
    const httpClient = HttpClient();
    return httpClient.post('auth/login', { email, password });
};

const todoSomething = () => {
    // remove user from local storage to log user out
};

export { loginApi, todoSomething };
