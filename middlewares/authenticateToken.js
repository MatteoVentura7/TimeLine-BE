
const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Accesso negato. Token mancante." });
  }

  jwt.verify(token, process.env.JWT_SECRET || "your_secret_key", (err, decoded) => {
    if (err) {
      console.error("Errore nella verifica del token:", err);
      // ⛔ Importante: usare return per fermare la funzione
      return res.status(403).json({ error: "Token non valido." });
    }

    // Se siamo qui, il token è valido
    req.user = decoded;
    next();
  });
}

module.exports = authenticateToken;