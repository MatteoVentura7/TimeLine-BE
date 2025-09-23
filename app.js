    const express = require('express'); // Importa il framework Express
    const app = express(); // Crea un'istanza dell'applicazione Express
    const port = 3000; // Definisce la porta su cui il server sarà in ascolto

    // Definisci una rotta per la homepage (il percorso "/")
    app.get('/', (req, res) => {
      res.send('Benvenuto nella tua prima applicazione Express!'); // Invia una risposta al client
    });

    // Avvia il server Express e lo mette in ascolto sulla porta specificata
    app.listen(port, () => {
      console.log(`Server in ascolto su http://localhost:${port}`); // Messaggio in console quando il server è avviato
    });