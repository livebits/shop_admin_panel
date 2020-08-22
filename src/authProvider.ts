import { AuthProvider } from 'ra-core';
import { API_URL } from './App';
import { Role, Permission, UserPermissions } from './types';

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
            .then(({ user, token, permissions }) => {
                localStorage.setItem('user', JSON.stringify(user));
                localStorage.setItem('token', token.accessToken);
                localStorage.setItem('permissions', JSON.stringify(permissions));
                localStorage.setItem('roles', JSON.stringify(user.roles));
            });
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('permissions');
        localStorage.removeItem('roles');
        return Promise.resolve();
    },
    checkError: (error) => {
        const status = error.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('permissions');
            localStorage.removeItem('roles');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    checkAuth: () =>
        localStorage.getItem('token') ? Promise.resolve() : Promise.reject(),
    getPermissions: () => {
        const permsString = localStorage.getItem('permissions');
        console.log('>>>', permsString);
        
        const perms = permsString ? JSON.parse(permsString) : null

        const rolesString = localStorage.getItem('roles');
        const roles = rolesString ? JSON.parse(rolesString) : null

        return perms ? Promise.resolve({ permissions: perms, roles }) : Promise.reject();
    },
};

export default authProvider;

export const hasPermissions = (permissions: UserPermissions, requirePermissions: Permission[]) => {
    if (!permissions) {
        return true
    }

    if (permissions.roles && permissions.roles.filter((r:Role) => r.name === "SUPERADMIN").length > 0) {
        return true;
    }

    if (permissions.permissions && permissions.permissions.length > 0) {

        let found = false;
        permissions.permissions.forEach(perm => {
            requirePermissions.forEach(reqPerm => {
                if (perm.resource === reqPerm.resource && perm.action === reqPerm.action) {
                    found = true;
                    return;
                }
            });
        });

        return found;
    }

    return false;
}
