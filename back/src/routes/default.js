const { Router } = require('express');
const router = Router();

// Routes
router.get('/', (req, res) =>{
    res.json({"Titulo": "Aloha!"});
})

module.exports = router;