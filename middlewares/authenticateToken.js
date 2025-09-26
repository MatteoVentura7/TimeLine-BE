const jwt = require('jsonwebtoken');

// Middleware per verificare il token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Accesso negato. Token mancante.' });
  }

  jwt.verify(token, 'your_secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token non valido.' });
    }

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;