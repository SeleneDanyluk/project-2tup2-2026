import { Book } from "../models/Book.js";

export const getAllBooks = async (req, res) => {
    const books = await Book.findAll();
    res.json(books);
};

export const getBookById = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
        return res.status(404).send("Libro no encontrado.");
    }
    res.json(book);
};

export const createBook = async (req, res) => {
    const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;

    if (!title || !author) {
        return res.status(400).send("El título y el autor son campos obligatorios.");
    };

    const newBook = await Book.create({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        available,
    });
    res.json(newBook);
};

export const updateBook = async (req, res) => {
    const { id } = req.params;
    const { title, author, rating, pageCount, summary, imageUrl, available } = req.body;
    const book = await Book.findByPk(id);
    if (!book) {
        return res.status(404).send("Libro no encontrado.");
    }
    if (!title || !author) {
        return res.status(400).send("El título y el autor son campos obligatorios.");
    }
    await book.update({
        title,
        author,
        rating,
        pageCount,
        summary,
        imageUrl,
        available,
    });
    await book.save();
    res.send("El libro ha sido actualizado correctamente.");
};

export const deleteBook = async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) {
        return res.status(404).send("Libro no encontrado.");
    }
    await book.destroy();
    res.send("El libro ha sido eliminado correctamente.");
};