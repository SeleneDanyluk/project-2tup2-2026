import { useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { errorToast, successToast } from "../../utils/notifications";

const NewBook = ({ book, isEditing = false, onBookAdded, onBookSaved }) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState(book?.title ?? "");
    const [author, setAuthor] = useState(book?.author ?? "");
    const [rating, setRating] = useState(book?.rating ?? "");
    const [pageCount, setPageCount] = useState(book?.pageCount ?? "");
    const [imageUrl, setImageUrl] = useState(book?.imageUrl ?? "");
    const [available, setAvailable] = useState(book?.available ?? false);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!title || !author) {
            errorToast("El autor y/o título son requeridos");
            return;
        }

        const bookData = {
            title,
            author,
            rating: parseInt(rating, 10),
            pageCount: parseInt(pageCount, 10),
            imageUrl,
            available,
        };

        if (isEditing) {
            fetch(`http://localhost:3000/books/${book.id}`, {
                headers: { "Content-type": "application/json" },
                method: "PUT",
                body: JSON.stringify(bookData),
            })
                .then(res => res.json())
                .then(() => {
                    onBookSaved({ ...bookData, id: book.id });
                    successToast(`¡Libro actualizado correctamente!`);
                })
                .catch(err => {
                    console.log(err);
                    errorToast("Error al actualizar el libro");
                });
        } else {
            onBookAdded(bookData);
            setTitle("");
            setAuthor("");
            setRating("");
            setPageCount("");
            setImageUrl("");
            setAvailable(false);
        }
    };

    return (
        <Card className="m-4 w-50" bg="success">
            <Card.Body>
                <Form className="text-white" onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="title">
                                <Form.Label>Título</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar título"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="author">
                                <Form.Label>Autor</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Ingresar autor"
                                    value={author}
                                    onChange={e => setAuthor(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="rating">
                                <Form.Label>Puntuación</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de estrellas"
                                    max={5}
                                    min={0}
                                    value={rating}
                                    onChange={e => setRating(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3" controlId="pageCount">
                                <Form.Label>Cantidad de páginas</Form.Label>
                                <Form.Control
                                    type="number"
                                    placeholder="Ingresar cantidad de páginas"
                                    min={1}
                                    value={pageCount}
                                    onChange={e => setPageCount(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row className="justify-content-between">
                        <Form.Group className="mb-3" controlId="imageUrl">
                            <Form.Label>URL de imagen</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ingresar url de imagen"
                                value={imageUrl}
                                onChange={e => setImageUrl(e.target.value)}
                            />
                        </Form.Group>
                    </Row>
                    <Row className="justify-content-end">
                        <Col md={3} className="d-flex flex-column justify-content-end align-items-end">
                            <Form.Check
                                type="switch"
                                id="available"
                                className="mb-3"
                                label="¿Disponible?"
                                checked={available}
                                onChange={e => setAvailable(e.target.checked)}
                            />
                            <div className="d-flex gap-2">
                                {!isEditing && (
                                    <Button variant="secondary" onClick={() => navigate("/library")}>
                                        Volver
                                    </Button>
                                )}
                                <Button variant="primary" type="submit">
                                    {isEditing ? "Editar lectura" : "Agregar lectura"}
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default NewBook;
