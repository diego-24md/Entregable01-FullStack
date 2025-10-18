const db = require('../config/db');

// Creamos un curso
exports.crearCurso = async (req, res) => {
  try {
    const { titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, categoria_id, subcategoria_id, docente_id } = req.body;
    const [result] = await db.query(
      'INSERT INTO cursos (titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, categoria_id, subcategoria_id, docente_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, categoria_id, subcategoria_id, docente_id]
    );
    res.json({ message: 'Curso creado correctamente', id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenemos todos los cursos
exports.obtenerCursos = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT c.id, c.titulo, c.descripcion, c.fecha_inicio, c.fecha_fin, c.duracion_horas,
             cat.nombre AS categoria, sub.nombre AS subcategoria,
             CONCAT(d.nombres, ' ', d.apellidos) AS docente
      FROM cursos c
      JOIN categorias cat ON c.categoria_id = cat.id
      JOIN subcategorias sub ON c.subcategoria_id = sub.id
      JOIN docentes d ON c.docente_id = d.id
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Actualizamos un curso
exports.actualizarCurso = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, categoria_id, subcategoria_id, docente_id } = req.body;
    await db.query(
      'UPDATE cursos SET titulo=?, descripcion=?, fecha_inicio=?, fecha_fin=?, duracion_horas=?, categoria_id=?, subcategoria_id=?, docente_id=? WHERE id=?',
      [titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, categoria_id, subcategoria_id, docente_id, id]
    );
    res.json({ message: 'Curso actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminamos un curso
exports.eliminarCurso = async (req, res) => {
  try {
    const { id } = req.params;
    await db.query('DELETE FROM cursos WHERE id=?', [id]);
    res.json({ message: 'Curso eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
