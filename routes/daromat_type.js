const express = require('express');
const router = express.Router();
const pool = require('../db'); // PostgreSQL ulanishi

// ✅ GET - Barcha daromat_type yozuvlar
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM daromat_type ORDER BY sana DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('GET daromat_type:', error);
    res.status(500).json({ error: 'Serverda xatolik' });
  }
});

// ✅ GET - Faqat 1 bola_id uchun va sana (oy) bo‘yicha
router.get('/bola/:bola_id/:yearMonth', async (req, res) => {
  const { bola_id, yearMonth } = req.params;
  try {
    const result = await pool.query(
      `SELECT * FROM daromat_type 
       WHERE bola_id = $1 AND TO_CHAR(sana, 'YYYY-MM') = $2`,
      [bola_id, yearMonth]
    );
    res.json(result.rows);
  } catch (error) {
    console.error('GET /bola/:id:', error);
    res.status(500).json({ error: 'Xatolik' });
  }
});

// ✅ POST - Yangi daromat yozuvi qo‘shish
router.post('/', async (req, res) => {
  const { bola_id, sana, naqt = 0, karta = 0, prichislena = 0 } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO daromat_type (bola_id, sana, naqt, karta, prichislena)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [bola_id, sana, naqt, karta, prichislena]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('POST daromat_type:', error);
    res.status(500).json({ error: 'Yozib bo‘lmadi' });
  }
});

// ✅ PUT - Ma’lumotni yangilash
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { naqt = 0, karta = 0, prichislena = 0 } = req.body;
  try {
    const result = await pool.query(
      `UPDATE daromat_type
       SET naqt = $1, karta = $2, prichislena = $3, updated_at = NOW()
       WHERE id = $4
       RETURNING *`,
      [naqt, karta, prichislena, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Topilmadi' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('PUT daromat_type:', error);
    res.status(500).json({ error: 'Yangilab bo‘lmadi' });
  }
});

// ✅ DELETE - O‘chirish
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'DELETE FROM daromat_type WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Topilmadi' });
    }
    res.json({ message: 'O‘chirildi', item: result.rows[0] });
  } catch (error) {
    console.error('DELETE daromat_type:', error);
    res.status(500).json({ error: 'O‘chirib bo‘lmadi' });
  }
});

module.exports = router;
