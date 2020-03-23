import {AuthProvider} from 'ra-core';
import {Error} from 'react-admin';
import decodeJwt from 'jwt-decode';
import {User} from "../models/users/UserInterface";
import {environment} from "../environments/environment";

// Specifies how many minutes before the automatic logout a warning should be displayed.
const logoutWarningInMinutes: number = 2;

/**
 * LoginResponse interface
 */
interface LoginResponse {
    result: boolean;
    token: string;
}

/**
 * Token interface
 */
export interface Token {
    user: User;
    exp: number;
}

/**
 * Returns the token from storage if it exists or NULL.
 */
const getToken = (): Token | null => {
    const token = localStorage.getItem('token');
    return token ? decodeJwt(token) as Token : null;
};

/**
 * Stores the token under the token key name.
 *
 * @param token is the token th be stored.
 */
const setToken = (token): void => {
    localStorage.setItem('token', token);
};

/**
 * Deletes the token from localStorage
 */
const deleteToken = (): void => {
    localStorage.removeItem('token');
};

/**
 * Returns the expiration date of the token if it exists or NULL.
 */
const getTokenExpirationDate = (): Date | null => {
    const token = getToken();
    return token ? new Date(token.exp * 1000) : null;
};

/**
 * Returns whether the token is expired.
 */
const getTokenExpired = (): boolean => {
    const tokenExpirationDate = getTokenExpirationDate();
    return tokenExpirationDate ? tokenExpirationDate < new Date() : true;
};

/**
 * Returns whether shop-db2-react-admin has notification permission.
 */
const checkNotificationPermission = (): boolean => {
    return Notification.permission !== 'granted';
};

/**
 * Shows a warning 2 minutes before the auto logout.
 * Reloads the page, when the token has been expired.
 */
const setTimers = (): void => {
    // Check if the token has already been expired.
    const expirationDate = getTokenExpirationDate();
    if (!expirationDate) {
        reloadPage();
        return;
    }

    // Check (and request) notification permissions
    if (!checkNotificationPermission()) {
        Notification.requestPermission();
    }

    // Get current timestamp
    const now = new Date().getTime();

    // Milliseconds until the token expires.
    const millisecondsToExpiration: number = expirationDate.getTime() - now;
    // Milliseconds until the warning should be displayed.
    const millisecondsToLogoutWarning: number = millisecondsToExpiration - (logoutWarningInMinutes * 60 * 1000);

    // Set warning timeout
    setTimeout(showLogoutWarning, millisecondsToLogoutWarning);

    // Set logout timeout
    // It's not really a logout just a page refresh. But since the AuthProvider will check the token state
    // when reloading the page, it's kind of a logout.
    setTimeout(reloadPage, millisecondsToExpiration);
};

/**
 * Reloads the page.
 */
const reloadPage = () => {
    window.location.reload();
};

/**
 * Shows a desktop notification (or alert if the notification is not available) with the expiration warning.
 */
const showLogoutWarning = () => {
    // Logout warning message
    let message = `You will be automatically logged out in ${logoutWarningInMinutes.toString()} minutes`;

    // Check if this browser supports desktop notifications
    if (!("Notification" in window) || !checkNotificationPermission()) {
        alert(message);
    } else {
        let notification = new Notification("Warning", {body: message});
        setTimeout(function () {
            notification.close()
        }, 10000);
    }
};

/**
 * AuthProvider for ReactAdmin
 */
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
                setToken(loginResponse.token);
                setTimers();
                return Promise.resolve();
            });
    },
    logout: () => {
        deleteToken();
        return Promise.resolve();
    },
    checkError: () => Promise.resolve(),
    checkAuth: () => {
        return getTokenExpired() ? Promise.reject() : Promise.resolve();
    },
    getPermissions: () => Promise.reject()
};

export default authProvider;
