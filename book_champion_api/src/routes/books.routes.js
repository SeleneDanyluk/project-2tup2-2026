import {Router} from "express";
import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from "../services/books.services.js";
import { verifyToken } from "../services/auth.services.js";

const router = Router();

router.get("/books", verifyToken, getAllBooks);
router.get("/books/:id", verifyToken, getBookById);
router.post("/books", verifyToken, createBook);
router.put("/books/:id", verifyToken, updateBook);
router.delete("/books/:id", verifyToken, deleteBook);

export default router;