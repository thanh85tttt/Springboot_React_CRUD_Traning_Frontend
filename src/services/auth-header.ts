/**
 * This function return headers that contains JSON Web Token to authorize API
 * @returns header and JSON Web Token 
 */
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user && user.accessToken) {
        return { Authorization: 'Bearer ' + user.accessToken };
    } else {
        return {};
    }
}