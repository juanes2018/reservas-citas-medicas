const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const registerUser = async (email, password, name) => {
        
    const role = 'user'; // Asignar rol por defecto
    if ( !email || !password || !name) {
        throw new Error('Todos los campos son obligatorios');
     
    }


                // Validar password mínimo 6
    if ( !password || password.length < 6) {
        throw new Error('La contraseña debe tener al menos 6 caracteres');
    } 

            
                // Validar rol
    const allowedRoles = ['admin', 'user'];
    if (!allowedRoles.includes(role)) {
        throw new Error('Rol no válido. Los roles permitidos son: admin, user');
    }   
 

                
                // Verificar email único
    const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    
    if (existingUser.length > 0) {
        throw new Error('El correo electrónico ya está registrado');
    }   

     
                 // Encriptar password
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password, name, role) VALUES ( ?, ?, ?, ?)', [email, hashedPassword, name, role]);

    return { message: 'Usuario registrado exitosamente' };


};

const loginUser = async (email, password) => {
    
    if (!email || !password) {
        throw new Error('Email y contraseña son obligatorios');
    }
    
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

   
    if (users.length === 0) {
        throw new Error('Credenciales inválidas');   
    }

    const user = users[0]; // Obtener el primer usuario encontrado   

    const isPasswordValid = await bcrypt.compare(password, user.password); 
    
    if (!isPasswordValid) {
        throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ id: user.id, role: user.role}, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    return token;

};

module.exports = {
    registerUser,
    loginUser
};  
