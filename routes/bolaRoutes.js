const express = require('express');
const router = express.Router();
const pool = require('../db');
const verifyToken = require('../middleware/verifyToken');

// 📥 GET: barcha bolalar
router.get('/', verifyToken, async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bola ORDER BY id DESC');
    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ➕ POST: yangi bola qo‘shish
router.post('/', verifyToken, async (req, res) => {
  const {
    username,
    metrka,
    guruh_id,
    tugilgan_kun,
    oylik_toliv,
    balans,
    holati,
    ota_FISH,
    ota_phone,
    ota_pasport,
    ona_FISH,
    ona_phone,
    ona_pasport,
    qoshimcha_phone,
    address,
    description
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO bola (
        username, metrka, guruh_id, tugilgan_kun, oylik_toliv, balans, holati,
        ota_FISH, ota_phone, ota_pasport, ona_FISH, ona_phone, ona_pasport,
        qoshimcha_phone, address, description
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7,
        $8, $9, $10, $11, $12, $13,
        $14, $15, $16
      ) RETURNING *`,
      [
        username, metrka, guruh_id, tugilgan_kun, oylik_toliv, balans, holati,
        ota_FISH, ota_phone, ota_pasport, ona_FISH, ona_phone, ona_pasport,
        qoshimcha_phone, address, description
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✏️ PUT: bolani yangilash
router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const {
    username,
    metrka,
    guruh_id,
    tugilgan_kun,
    oylik_toliv,
    balans,
    holati,
    ota_FISH,
    ota_phone,
    ota_pasport,
    ona_FISH,
    ona_phone,
    ona_pasport,
    qoshimcha_phone,
    address,
    description
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE bola SET
        username = $1,
        metrka = $2,
        guruh_id = $3,
        tugilgan_kun = $4,
        oylik_toliv = $5,
        balans = $6,
        holati = $7,
        ota_FISH = $8,
        ota_phone = $9,
        ota_pasport = $10,
        ona_FISH = $11,
        ona_phone = $12,
        ona_pasport = $13,
        qoshimcha_phone = $14,
        address = $15,
        description = $16,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $17
      RETURNING *`,
      [
        username, metrka, guruh_id, tugilgan_kun, oylik_toliv, balans, holati,
        ota_FISH, ota_phone, ota_pasport, ona_FISH, ona_phone, ona_pasport,
        qoshimcha_phone, address, description, id
      ]
    );
    res.status(200).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ❌ DELETE: bolani o‘chirish
router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM bola WHERE id = $1', [id]);
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
