const connection = require("../db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const crypto = require("crypto"); // Per generare token univoci

// Configurazione del trasportatore Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "matteo.timeline@gmail.com", // Sostituisci con la tua email
    pass: "phhk bcvo kisl hiqv", // Sostituisci con la tua password o app password
  },
});

// Funzione per ottenere tutti gli utenti
const getAllUsers = (req, res) => {
  const query = "SELECT * FROM user";
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Errore nel server");
    }
    res.json(results);
  });
};

// Funzione per validare la password
const validatePassword = (password) => {
  if (password.length < 8) {
    return "La password deve contenere almeno 8 caratteri.";
  } else if (!/[A-Z]/.test(password)) {
    return "La password deve contenere almeno una lettera maiuscola.";
  } else if (!/[0-9]/.test(password)) {
    return "La password deve contenere almeno un numero.";
  }
  return "";
};

// Funzione per aggiungere un nuovo utente
const createUser = (req, res) => {
  const { email, password } = req.body;

  // Validazione della password
  const passwordValidationMessage = validatePassword(password);
  if (passwordValidationMessage) {
    return res.status(400).json({ error: passwordValidationMessage });
  }

  // Controlla se l'email esiste già nel database
  const checkQuery = "SELECT * FROM user WHERE email = ?";
  connection.query(checkQuery, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nel server" });
    }

    if (results.length > 0) {
      return res.status(400).json({ error: "Email già esistente" });
    }

    // Cripta la password prima di inserirla nel database
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Errore nel server" });
      }

      // Genera un token univoco per la conferma dell'email
      const emailToken = crypto.randomBytes(32).toString("hex");
      const confirmationLink = `http://localhost:5173/confirm-email?token=${emailToken}`;

      const query =
        "INSERT INTO user (email, password, emailToken, isConfirmed) VALUES (?, ?, ?, ?)";
      connection.query(
        query,
        [email, hashedPassword, emailToken, false],
        (err, result) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ error: "Errore nel server" });
          }

          // Invia email di conferma
          const mailOptions = {
            from: "matteo.timeline@gmail.com", // Sostituisci con la tua email
            to: email,
            subject: "Conferma la tua email",
            text: `Clicca sul seguente link per confermare la tua email: ${confirmationLink}`,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Errore durante l'invio dell'email:", error);
            } else {
              console.log("Email inviata:", info.response);
            }
          });

          res.status(201).json({
            message:
              "Utente creato con successo. Controlla la tua email per la conferma.",
            id: result.insertId,
          });
        }
      );
    });
  });
};

// Funzione per il login
const loginUser = (req, res) => {
  const { email, password } = req.body;
  console.log("Email:", email, "Password:", password);

  const query = "SELECT * FROM user WHERE email = ?";
  connection.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nel server" });
    }

    if (results.length === 0) {
      console.log("Nessun utente trovato con questa email");
      return res.status(401).json({ error: "Credenziali non valide" });
    }

    const user = results[0];
    console.log("Utente trovato:", user);

    // Controlla se l'email è stata confermata
    if (!user.isConfirmed) {
      return res.status(403).json({
        error:
          "Email non confermata. Controlla la tua email per completare la registrazione.",
      });
    }

    // Comparazione della password criptata
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Errore nel server" });
      }

      if (!isMatch) {
        console.log("Password non corrisponde");
        return res.status(401).json({ error: "Credenziali non valide" });
      }

      // Generazione del token JWT
      const token = jwt.sign(
        { id: user.id, email: user.email },
        "your_secret_key",
        { expiresIn: "1h" }
      );

      console.log("Login effettuato con successo");
      res.status(200).json({ message: "Login effettuato con successo", token });
    });
  });
};

// Funzione per confermare l'email e reindirizzare al login
const confirmEmail = (req, res) => {
  const { token } = req.body;

  // Verifica se il token esiste nel database
  const query = "SELECT * FROM user WHERE emailToken = ?";
  connection.query(query, [token], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nel server" });
    }

    if (results.length === 0) {
      return res
        .status(400)
        .json({ error: "Token non valido o già utilizzato." });
    }

    const user = results[0];

    // Aggiorna il valore di isConfirmed
    const updateQuery =
      "UPDATE user SET isConfirmed = 1, emailToken = NULL WHERE id = ?";
    connection.query(updateQuery, [user.id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Errore nel server" });
      }

      res.status(200).json({
        message:
          "Email confermata con successo. Ora puoi effettuare il login.",
      });
    });
  });
};

// Modifica della funzione sendResetPasswordEmail per salvare il token nel database
const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email è obbligatoria." });
  }

  try {
    // Controlla se l'utente esiste nel database
    const query = "SELECT * FROM user WHERE email = ?";
    connection.query(query, [email], async (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Errore nel server" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Utente non trovato" });
      }

      // Genera un token univoco per il reset della password
      const resetToken = crypto.randomBytes(32).toString("hex");
      const updateQuery = "UPDATE user SET resetToken = ? WHERE email = ?";

      connection.query(updateQuery, [resetToken, email], async (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Errore nel server" });
        }

        // Configura il trasportatore nodemailer
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "matteo.timeline@gmail.com", // Sostituisci con la tua email
            pass: "phhk bcvo kisl hiqv", // Sostituisci con la tua password o app password
          },
        });

        // Opzioni per l'email
        const mailOptions = {
          from: "matteo.timeline@gmail.com",
          to: email,
          subject: "Richiesta di reset della password",
          text: `Clicca sul seguente link per reimpostare la tua password: http://localhost:5173/reset-password?token=${resetToken}`,
        };

        // Invia l'email
        try {
          await transporter.sendMail(mailOptions);
          res.status(200).json({ message: "Link per il reset inviato con successo." });
        } catch (error) {
          console.error("Errore durante l'invio dell'email:", error);
          res.status(500).json({ message: "Impossibile inviare il link per il reset." });
        }
      });
    });
  } catch (error) {
    console.error("Errore durante l'elaborazione della richiesta:", error);
    res.status(500).json({ message: "Errore interno del server." });
  }
};

// Modifica della funzione updatePassword per includere la verifica del token
const updatePassword = (req, res) => {
  const { token, newPassword } = req.body;

  // Validazione della nuova password
  const passwordValidationMessage = validatePassword(newPassword);
  if (passwordValidationMessage) {
    return res.status(400).json({ error: passwordValidationMessage });
  }

  // Controlla se il token esiste nel database
  const query = "SELECT * FROM user WHERE resetToken = ?";
  connection.query(query, [token], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nel server" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Token non valido o scaduto" });
    }

    const user = results[0];

    // Cripta la nuova password
    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Errore nel server" });
      }

      // Aggiorna la password e rimuove il token dal database
      const updateQuery = "UPDATE user SET password = ?, resetToken = NULL WHERE id = ?";
      connection.query(updateQuery, [hashedPassword, user.id], (err) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Errore nel server" });
        }

        res.status(200).json({ message: "Password aggiornata con successo" });
      });
    });
  });
};

// Esporta le funzioni
module.exports = {
  getAllUsers,
  createUser,
  loginUser,
  confirmEmail,
  sendResetPasswordEmail,
  updatePassword,
};
