const express = require("express");
const {
  getAllUsers,
  loginUser,
  createUser,
  confirmEmail,
  sendResetPasswordEmail,
  updatePassword,
  verifyResetToken,
  verifyEmailToken
} = require("../controllers/UserController");
const authenticateToken = require("../middlewares/authenticateToken");

const router = express.Router();

// Definizione delle rotte
router.get("/", authenticateToken, getAllUsers); // Ottieni tutti gli utenti (protetto)
router.post("/login", loginUser); // Login utente
router.post("/", createUser); // Crea un nuovo utente
router.post("/confirm-email", confirmEmail, authenticateToken); // Conferma email
router.post("/reset-password", sendResetPasswordEmail); // Invia email di reset della password
router.put("/update-password", updatePassword , authenticateToken); // Aggiorna la password
router.get("/verify-reset-token", verifyResetToken); // Verifica il token di reset della password
router.get("/verify-email-token", verifyEmailToken); // Verifica il token di conferma dell'email

module.exports = router;

