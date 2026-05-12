import { jwtDecode } from "jwt-decode";

export const isTokenValid = (token) => {
    if (!token) return false;
    try {
        const decodedToken = jwtDecode(token);
        // Date.now() returns milliseconds, JWT exp is in seconds
        const currentTime = Date.now() / 1000;
        return currentTime < decodedToken.exp;
    } catch (error) {
        console.error('Error decoding token:', error);
        return false;
    }
};
