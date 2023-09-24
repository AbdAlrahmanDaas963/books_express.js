const router = require("express").Router();
const booksController = require("../controllers/booksController");

router.get("/:id", booksController.getBook);
router.get("/search/:key", booksController.searchBook);
router.get("/", booksController.getAllBooks);
router.post("/", booksController.createBook);
router.delete("/:id", booksController.deleteBook);
router.put("/:id", booksController.updateBook);

module.exports = router;
