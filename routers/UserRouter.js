const express = require("express");
const {
  getAllUsers,
  loginUser,
  createUser
} = require("../controllers/UserController");

const router = express.Router();

// Definizione delle rotte
router.get("/", getAllUsers); // Ottieni tutti gli utenti
router.post("/login", loginUser); // Login utente
router.post("/", createUser); // Crea un nuovo utente

module.exports = router;

