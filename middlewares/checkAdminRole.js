const checkAdminRole = (req, res, next) => {
    try {
        // Assumendo che il ruolo sia incluso nel token decodificato
        const userRole = req.user.role; // req.user viene popolato dal middleware authenticateToken

        if (userRole !== 'admin') {
            return res.status(403).json({ message: 'Accesso negato: non sei un amministratore.' });
        }

        next(); // Passa al prossimo middleware o controller
    } catch (error) {
        res.status(500).json({ message: 'Errore del server.' });
    }
};

module.exports = checkAdminRole;