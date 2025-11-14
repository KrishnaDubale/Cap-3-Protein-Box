const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const userRoutes = require('./userRoutes');


router.get('/health', (req, res) => {
  res.status(200).json({ message: "aaalllll issss welllll" });
});


router.use('/', authRoutes);
router.use('/', userRoutes);

module.exports = router;
