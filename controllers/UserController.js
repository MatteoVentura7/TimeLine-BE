const express = require('express');
const router = express.Router();
const db = require('../db'); 
const connection = require("../db");

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


// Funzione per aggiungere un nuovo utente
const createUser = (req, res) => {
  const { email, password } = req.body;

  const query = "INSERT INTO user (email, password) VALUES (?, ?)";
  connection.query(query, [email, password], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Errore nel server" });
    }
    res
      .status(201)
      .json({ message: "Utente creato con successo", id: result.insertId });
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

    if (password !== user.password) {
      console.log("Password non corrisponde");
      return res.status(401).json({ error: "Credenziali non valide" });
    }

    console.log("Login effettuato con successo");
    res.status(200).json({ message: "Login effettuato con successo" });
  });
};

// Esporta le funzioni
module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};