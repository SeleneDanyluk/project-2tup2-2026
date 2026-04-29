import { useState, useEffect } from "react";

const CleanupDemo = () => {
    const [query, setQuery] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            // Recién acá hacemos el fetch, 500ms después de que el usuario paró de escribir
            console.log("Buscando:", query);
        }, 500);

        // Cleanup: si query cambia antes de que pasen los 500ms,
        // cancelamos el timer anterior antes de crear uno nuevo
        return () => {
            console.log("Cleanup ejecutado");
            clearTimeout(timer);
        };
    }, [query]);

    return (
        <div className="container py-4">
            <h2>Demo: Cleanup function</h2>
            <p className="text-muted">
                Abrí la consola del navegador y empezá a escribir. Vas a ver cómo el cleanup
                cancela el timer cada vez que cambia el input, y el fetch solo se ejecuta
                cuando dejás de tipear 500ms.
            </p>
            <input
                type="text"
                className="form-control w-50"
                value={query}
                onChange={e => setQuery(e.target.value)}
                autoFocus
            />
        </div>
    );
};

export default CleanupDemo;
