import { useState } from 'react';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import ConfirmDeleteModal from '../ui/ConfirmDeleteModal';

const BookItem = ({ id, title, author, rating, pageCount, imageUrl, available, summary, onDelete }) => {
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`${id}`, {
            state: {
                book: {
                    title,
                    author,
                    rating,
                    pageCount,
                    summary,
                    imageUrl,
                    available,
                },
            },
        });
    };

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const handleConfirmDelete = () => {
        setShowModal(false);
        onDelete(id);
    };

    return (
        <>
            <Card className="mx-3 mb-4" style={{ width: '18rem' }}>
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>
                    <div>
                        <div>{rating} estrellas</div>
                        <p>{pageCount} páginas</p>
                        <p>{available ? "Disponible" : "Reservado"}</p>
                    </div>
                    <div className="d-flex gap-2">
                        <Button variant="primary" onClick={handleClick}>
                            Seleccionar libro
                        </Button>
                        <Button variant="danger" onClick={handleDeleteClick}>
                            Eliminar
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            <ConfirmDeleteModal
                show={showModal}
                onCancel={handleCancel}
                onConfirm={handleConfirmDelete}
                bookTitle={title}
            />
        </>
    );
};

export default BookItem;
