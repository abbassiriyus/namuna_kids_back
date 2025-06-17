const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('../middleware/verifyToken');

// ✅ GET — barcha oylik_type yozuvlari
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM oylik_type ORDER BY id DESC`);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST — yangi oylik_type qo‘shish
router.post('/', verifyToken, async (req, res) => {
  const { oylik_type } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO oylik_type (oylik_type) VALUES ($1) RETURNING *`,
      [oylik_type]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ PUT — mavjud oylik_type ni yangilash
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { oylik_type } = req.body;

  try {
    const result = await pool.query(
      `UPDATE oylik_type 
       SET oylik_type = $1, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $2 
       RETURNING *`,
      [oylik_type, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ DELETE — oylik_type ni o‘chirish
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM oylik_type WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
