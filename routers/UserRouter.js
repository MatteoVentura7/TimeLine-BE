const express = require("express");
const {
  getAllUsers,
  loginUser,
  createUser
} = require("../controllers/UserController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

// Definizione delle rotte
router.get("/", authenticateToken, getAllUsers); // Ottieni tutti gli utenti (protetto)
router.post("/login", loginUser); // Login utente
router.post("/", createUser); // Crea un nuovo utente
router.post("/forgot-password", ); // Password dimenticata

module.exports = router;

