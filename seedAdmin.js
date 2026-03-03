const pool = require('./src/config/db'); // tu conexión a MySQL
const bcrypt = require('bcryptjs');

(async () => {
  try {
    const name = 'Admin Inicial';
    const email = 'admin@test.com';
    const password = 'Admin123!'; // contraseña inicial
    const role = 'admin';

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Verificar si ya existe
    const [existing] = await pool.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      console.log('El usuario admin ya existe.');
      process.exit();
    }

    // Insertar admin
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, role]
    );

    console.log('Admin creado con éxito:');
    console.log({
      id: result.insertId,
      name,
      email,
      role
    });

    process.exit();
  } catch (error) {
    console.error('Error al crear admin:', error);
    process.exit(1);
  }
})();