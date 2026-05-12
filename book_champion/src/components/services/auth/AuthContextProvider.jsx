import { useState } from "react";
import { AuthenticationContext } from "./auth.context";

const tokenValue = localStorage.getItem("book-champions-token");

export const AuthenticationContextProvider = ({ children }) => {
    const [token, setToken] = useState(tokenValue);

    const handleUserLogin = (token) => {
        localStorage.setItem("book-champions-token", token);
        setToken(token);
    };

    const handleUserLogout = () => {
        localStorage.removeItem("book-champions-token");
        setToken(null);
    };

    //mas información

    return (
        <AuthenticationContext value={{ token, handleUserLogin, handleUserLogout }}>
            {children}
        </AuthenticationContext>
    );
};
