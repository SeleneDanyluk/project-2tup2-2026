import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router';
import { Button } from 'react-bootstrap';
import NewBook from '../newBook/NewBook';
import Books from '../books/Books';
import BookDetails from '../bookDetails/BookDetails';
import { errorToast, successToast } from '../../utils/notifications';

const Dashboard = ({ onLogout }) => {
    const [books, setBooks] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === "/library") {
            fetch("http://localhost:3000/books")
                .then(res => res.json())
                .then(data => setBooks([...data]))
                .catch(error => console.log(error));
        }
    }, [location]);

    const handleBookAdded = (enteredBook) => {
        fetch("http://localhost:3000/books", {
            headers: {
                "Content-type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(enteredBook)
        })
            .then(res => res.json())
            .then(data => {
                setBooks(prevBooks => [data, ...prevBooks]);
                successToast(`¡Libro "${data.title}" agregado correctamente!`);
                navigate("/library");
            })
            .catch(err => {
                console.log(err);
                errorToast("Error al agregar el libro");
            });
    };

    const handleDeleteBook = (id) => {
        fetch(`http://localhost:3000/books/${id}`, {
            method: "DELETE"
        })
            .then(() => {
                setBooks(prevBooks => prevBooks.filter(book => book.id !== id));
                successToast("Libro eliminado correctamente");
            })
            .catch(err => {
                console.log(err);
                errorToast("Error al eliminar el libro");
            });
    };

    const handleNavigateAddBook = () => {
        navigate("/library/add-book", { replace: true });
    };

    const handleLogout = () => {
        onLogout();
        navigate("/login");
    };

    return (
        <div>
            <div className="d-flex justify-content-end gap-2 p-2">
                <Button variant="success" onClick={handleNavigateAddBook}>
                    Agregar libro
                </Button>
                <Button variant="secondary" onClick={handleLogout}>
                    Cerrar sesión
                </Button>
            </div>
            <h2 className="text-center">Book champions app</h2>
            <p className="text-center">¡Quiero leer libros!</p>
            <Routes>
                <Route
                    index
                    element={
                        <Books books={books} onDelete={handleDeleteBook} />
                    }
                />
                <Route
                    path="add-book"
                    element={<NewBook onBookAdded={handleBookAdded} />}
                />
                <Route path=":id" element={<BookDetails />} />
            </Routes>
        </div>
    );
};

export default Dashboard;
