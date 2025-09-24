const express = require("express");
const {
  getAllUsers,
 
  loginUser,
} = require("../controllers/UserController");

const router = express.Router();

// Definizione delle rotte
router.get("/", getAllUsers); // Ottieni tutti gli utenti
router.post("/login", loginUser); // Login utente

module.exports = router;

