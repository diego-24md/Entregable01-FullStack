const express = require('express');
const dotenv = require('dotenv');
const cursoRoutes = require('./routes/cursoRoutes');

dotenv.config();

const app = express();

// ✅ Middleware para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Rutas principales
app.use('/api/cursos', cursoRoutes);

// ✅ Ruta base
app.get('/', (req, res) => {
  res.send('API de Cursos funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
