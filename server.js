const express = require('express');
const dotenv = require('dotenv');
const cursoRoutes = require('./routes/cursoRoutes');

dotenv.config();

const app = express();

// 🔥 Esto es obligatorio para leer JSON en POST y PUT
app.use(express.json());

// Rutas
app.use('/api/cursos', cursoRoutes);

app.get('/', (req, res) => {
  res.send('API de Cursos funcionando correctamente');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
