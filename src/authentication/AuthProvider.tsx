import {AuthProvider} from 'ra-core';
import {Error} from 'react-admin';
import decodeJwt from 'jwt-decode';
import {User} from "../models/users/UserInterface";
import {environment} from "../environments/environment";

interface LoginResponse {
    result: boolean;
    token: string;
}

export interface Token {
    user: User;
    exp: number;
}

const authProvider: AuthProvider = {
    login: ({username, password}) => {
        const _id = parseInt(username);
        const request = new Request(`${environment.apiURL}/login`, {
            method: 'POST',
            body: JSON.stringify({id: _id, password: password}),
            headers: new Headers({'Content-Type': 'application/json'}),
        });
        return fetch(request)
            .then(response => {
                if (response.status < 200 || response.status >= 300) {
                    throw new Error(response.statusText);
                }
                return response.json();
            })
            .then((loginResponse: LoginResponse) => {
                localStorage.setItem('token', loginResponse.token);
                return Promise.resolve();
            });
    },
    logout: () => {
        localStorage.removeItem('token');
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        const token = localStorage.getItem('token');
        if (!token) {
            return Promise.reject();
        }
        const decodedToken: Token = decodeJwt(token);
        if (decodedToken) {
            // Check expiration
            if (decodedToken.exp < new Date().getTime() / 1000) {
                return Promise.reject();
            }
            return Promise.resolve();
        }
        return Promise.reject();
    },
    getPermissions: () => Promise.reject('Unknown method'),
};

export default authProvider;
