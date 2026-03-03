const db = require('../config/db');

exports.createReservation = async (data) => {

       // 🔥 convertir fecha correctamente
    const formattedDate = data.date.split('T')[0];
                //Validar Conflicto
    const [conflict] = await db.query('SELECT * FROM appointments WHERE date = ? AND timeBlockId = ?', [formattedDate, data.timeBlockId]);

   if (conflict.length > 0) {
       throw new Error('Ya existe una reservación para esa fecha y hora');
   }

   

            //Insertar conflicto
   const [result] = await db.query('INSERT INTO appointments (userId, date, timeBlockId) VALUES (?, ?, ?)', 
   [data.userId, formattedDate, data.timeBlockId]);

   return { id: result.insertId, ...data }; 
};

exports.getReservations = async (userId) => {
    const [reservations] = await db.query('SELECT * FROM appointments WHERE userId = ?', [userId]);
    return reservations;
};

exports.updateReservation = async (id, data) => {


          // 🔥 FORMATEAR FECHA
    const formattedDate = data.date.split('T')[0];

     // 1. Validar conflicto
  const [conflict] = await db.query(
    `SELECT * FROM appointments 
     WHERE date = ? 
     AND timeBlockId = ? 
     AND id != ?`,
    [formattedDate, data.timeBlockId, id]
  );

  if (conflict.length > 0) {
    throw new Error('Ese horario ya está ocupado');
  }

                //Actualizar   
    const [result] = await db.query('UPDATE appointments SET date = ?, timeBlockId = ? WHERE id = ?', 
    [formattedDate, data.timeBlockId, id]);

    if (result.affectedRows === 0) {
        throw new Error('Reservación no encontrada');
    }

    return { id, ...data };
};

exports.deleteReservation = async (id) => {
    const [result] = await db.query('DELETE FROM appointments WHERE id = ?', [id]);         
    if (result.affectedRows === 0) {
        throw new Error('Reservación no encontrada');
    }
};

