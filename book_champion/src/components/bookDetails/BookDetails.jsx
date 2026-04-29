import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { Button, Card } from "react-bootstrap";
import NewBook from "../newBook/NewBook";

const BookDetails = () => {
    const [book, setBook] = useState(null);
    const [showBookForm, setShowBookForm] = useState(false);

    const { state } = useLocation();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const bookState = {
            ...state.book,
            id: parseInt(id, 10),
        };
        setBook(bookState);
    }, [state.book, id]);

    const handleBookUpdated = (updatedBook) => {
        setBook(updatedBook);
        setShowBookForm(false);
    };

    if (!book) return null;

    return (
        <div className="d-flex flex-column align-items-center mt-4">
            <Card style={{ width: "22rem" }}>
                <Card.Img variant="top" src={book.imageUrl} />
                <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{book.author}</Card.Subtitle>
                    <p className="mb-1">{book.rating} estrellas</p>
                    <p className="mb-1">{book.pageCount} páginas</p>
                    <p className="mb-1">
                        {book.available ? "Disponible" : "Reservado"}
                    </p>
                    <p>
                        <strong>Sinopsis:</strong> {book.summary}
                    </p>
                    <div className="d-flex gap-2">
                        <Button
                            variant="secondary"
                            onClick={() => setShowBookForm(prev => !prev)}
                        >
                            {showBookForm ? "Ocultar formulario" : "Editar libro"}
                        </Button>
                        <Button onClick={() => navigate("/library", { replace: true })}>
                            Volver a la página principal
                        </Button>
                    </div>
                </Card.Body>
            </Card>

            {showBookForm && (
                <NewBook
                    isEditing
                    book={book}
                    onBookSaved={handleBookUpdated}
                />
            )}
        </div>
    );
};

export default BookDetails;
