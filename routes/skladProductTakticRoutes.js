const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('../middleware/verifyToken');

// 📥 GET: barcha taktika yozuvlari
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT * FROM sklad_product_taktic ORDER BY id DESC
    `);
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ POST: yangi taktika yozuvi qo‘shish
router.post('/', verifyToken, async (req, res) => {
  const { hajm, sklad_product_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO sklad_product_taktic (hajm, sklad_product_id)
       VALUES ($1, $2)
       RETURNING *`,
      [hajm, sklad_product_id]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ PUT: mavjud taktika yozuvini yangilash
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { hajm, sklad_product_id } = req.body;

  try {
    const result = await pool.query(
      `UPDATE sklad_product_taktic
       SET hajm = $1,
           sklad_product_id = $2,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [hajm, sklad_product_id, id]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE: taktika yozuvini o‘chirish
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  try {
    await pool.query(`DELETE FROM sklad_product_taktic WHERE id = $1`, [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
