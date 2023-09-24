const Book = require("../models/Books");

module.exports = {
  createBook: async (req, res) => {
    const newBook = new Book(req.body);
    try {
      await newBook.save();
      res.status(200).json("Book created successfully <***>");
    } catch (error) {
      res.status(500).json("Failed to create Book <***>");
    }
  },
  getAllBooks: async (req, res) => {
    try {
      res.set("Access-Control-Allow-Origin", "*");
      const books = await Book.find().sort({ createdAt: -1 });
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json("Failed to get Books <***>");
    }
  },
  getBook: async (req, res) => {
    try {
      res.set("Access-Control-Allow-Origin", "*");
      const book = await Book.findById(req.params.id);
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json("Failed to get the Book <***>");
    }
  },
  deleteBook: async (req, res) => {
    try {
      res.set("Access-Control-Allow-Origin", "*");
      const bookId = req.params.id;
      const deletedBook = await Book.findByIdAndRemove(bookId);

      if (!deletedBook) {
        return res.status(404).json("Book not found");
      }

      res.status(200).json("Book deleted successfully <***>");
    } catch (error) {
      res.status(500).json("Failed to delete the Book <***>");
    }
  },
  updateBook: async (req, res) => {
    try {
      res.set("Access-Control-Allow-Origin", "*");
      const bookId = req.params.id;
      const updates = req.body;

      // Use findByIdAndUpdate to find the book by ID and update its values
      const updatedBook = await Book.findByIdAndUpdate(bookId, updates, {
        new: true,
      });

      if (!updatedBook) {
        return res.status(404).json("Book not found");
      }

      res.status(200).json(updatedBook);
    } catch (error) {
      res.status(500).json("Failed to update the Book");
    }
  },
  searchBook: async (req, res) => {
    try {
      res.set("Access-Control-Allow-Origin", "*");
      const result = await Book.aggregate([
        {
          $search: {
            index: "books",
            text: {
              query: req.params.key,
              path: {
                wildcard: "*",
              },
            },
          },
        },
      ]);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json("Failed to get the Books <***>");
    }
  },
};
