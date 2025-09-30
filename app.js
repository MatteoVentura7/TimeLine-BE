
    const express = require('express'); // Importa il framework Express
    require("dotenv").config();
    const app = express(); // Crea un'istanza dell'applicazione Express
  

    const db = require("./db.js");
    const cors = require("cors");
    
    // Usa il middleware CORS
    app.use(cors());
    // Middleware per il parsing del body in formato JSON
    app.use(express.json());
    
    // ROUTER
    const userRouter = require("./routers/UserRouter");
    app.use("/users", userRouter);
   
   
   
    
    // Definisci una rotta per la homepage (il percorso "/")
    app.get('/', (req, res) => {
      res.send('Benvenuto nella tua prima applicazione Express!'); // Invia una risposta al client
    });

    // Avvia il server Express e lo mette in ascolto sulla porta specificata
    app.listen(process.env.PORT, () => {
      console.log(`Server in ascolto su http://localhost:${process.env.PORT}`); // Messaggio in console quando il server è avviato
    });

