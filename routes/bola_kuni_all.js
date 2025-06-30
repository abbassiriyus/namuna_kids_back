const express = require('express');
const router = express.Router();
const pool = require('../db'); // PostgreSQL poolni chaqiramiz

// CREATE - POST /bola_kuni_all
router.post('/', async (req, res) => {
  const { mavzu, sana } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO bola_kuni_all (mavzu, sana) VALUES ($1, $2) RETURNING *`,
      [mavzu, sana]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('bola_kuni_all create error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// GET /bola_kuni_all?month=YYYY-MM
router.get('/', async (req, res) => {
  const { month } = req.query;

  try {
    if (month) {
      // month formatini tekshirish (YYYY-MM)
      if (!/^\d{4}-\d{2}$/.test(month)) {
        return res.status(400).json({ error: 'Invalid month format. Use YYYY-MM.' });
      }

      const year = month.split('-')[0];
      const monthNum = parseInt(month.split('-')[1], 10);

      // oydagi maksimal kunni aniqlash
      const lastDay = new Date(year, monthNum, 0).getDate();
      const startDate = `${month}-01`;
      const endDate = `${month}-${lastDay}`;

      const result = await pool.query(
        `SELECT * FROM bola_kuni_all WHERE sana BETWEEN $1 AND $2 ORDER BY sana DESC`,
        [startDate, endDate]
      );
      return res.json(result.rows);
    }

    // agar month bo‘lmasa, barcha malumot
    const result = await pool.query(`SELECT * FROM bola_kuni_all ORDER BY sana DESC`);
    res.json(result.rows);
  } catch (err) {
    console.error('bola_kuni_all fetch error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});


// READ ONE - GET /bola_kuni_all/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM bola_kuni_all WHERE id = $1`, [id]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('bola_kuni_all fetch by id error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// UPDATE - PUT /bola_kuni_all/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { mavzu, sana } = req.body;
  try {
    const result = await pool.query(
      `UPDATE bola_kuni_all SET mavzu = $1, sana = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *`,
      [mavzu, sana, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error('bola_kuni_all update error:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Avval bola_kun yozuvlarini o‘chiramiz
    await client.query(`DELETE FROM bola_kun WHERE bola_kuni_all_id = $1`, [id]);

    // So‘ngra bola_kuni_all ni o‘chiramiz
    const result = await client.query(`DELETE FROM bola_kuni_all WHERE id = $1 RETURNING *`, [id]);

    if (result.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Not found' });
    }

    await client.query('COMMIT');
    res.json({ message: 'Dars va unga bog‘langan davomatlar o‘chirildi' });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('bola_kuni_all delete error:', err.message);
    res.status(500).json({ error: 'Server error' });
  } finally {
    client.release();
  }
});


module.exports = router;
