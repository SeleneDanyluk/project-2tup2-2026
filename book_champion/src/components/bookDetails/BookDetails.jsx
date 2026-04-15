import { useLocation, useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";

const BookDetails = () => {
    const { state } = useLocation();
    const navigate = useNavigate();
    const { title, author, rating, pageCount, summary, imageUrl, available } = state.book;

    return (
        <div className="d-flex justify-content-center mt-4">
            <Card style={{ width: "22rem" }}>
                <Card.Img variant="top" src={imageUrl} />
                <Card.Body>
                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                    <p className="mb-1">{rating} estrellas</p>
                    <p className="mb-1">{pageCount} páginas</p>
                    <p className="mb-1">
                        {available ? "Disponible" : "Reservado"}
                    </p>
                    <p>
                        <strong>Sinopsis:</strong> {summary}
                    </p>
                    <Button onClick={() => navigate("/library", { replace: true })}>
                        Volver a la página principal
                    </Button>
                </Card.Body>
            </Card>
        </div>
    );
};

export default BookDetails;
