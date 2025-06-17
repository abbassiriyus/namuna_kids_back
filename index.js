const express = require('express');
const fileUpload = require("express-fileupload");
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes')
const lavozimRoutes = require('./routes/lavozimRoutes');
const xodimRoutes = require('./routes/xodimRoutes');
const jarimaRoutes = require('./routes/jarimaRoutes');
const bonusRoutes = require('./routes/bonusRoutes');
const kunlikRoutes = require('./routes/kunlikRoutes');
const oylikTypeRoutes = require('./routes/oylikTypeRoutes');
const skladProductRoutes = require('./routes/skladProductRoutes');
const skladProductTakticRoutes = require('./routes/skladProductTakticRoutes');
const guruhRoutes = require('./routes/guruhRoutes');
const bolaRoutes = require('./routes/bolaRoutes');
const app = express();
const port = 4000;

// Middleware
app.use(cors({ origin: '*' }));
app.use(fileUpload());
app.use(express.json());
app.use(express.static('./uploads'));

// Routers
app.use('/admin', adminRoutes);
app.use('/lavozim', lavozimRoutes);
app.use('/xodim', xodimRoutes);
app.use('/jarima', jarimaRoutes);
app.use('/bonus', bonusRoutes);
app.use('/kunlik', kunlikRoutes);
app.use('/oylik_type', oylikTypeRoutes);
app.use('/sklad_product', skladProductRoutes);
app.use('/sklad_product_taktic', skladProductTakticRoutes);
app.use('/guruh', guruhRoutes);
app.use('/bola', bolaRoutes);


// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Serverda xato yuz berdi', error: err.message });
});

// Serverni ishga tushirish
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
