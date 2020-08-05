import { AuthProvider } from 'ra-core';
import { API_URL } from './App';

const authProvider: AuthProvider = {
    login: ({ username, password }) => {        
        const request = new Request(`${API_URL}/auth/login`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then(({ user, token }) => {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token.accessToken);
            });
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => Promise.reject('Unknown method'),
};

export default authProvider;
