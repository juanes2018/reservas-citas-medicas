const db = require('../config/db');

exports.getUserAppointments = async (userId) => {
  const [rows] = await db.query(
        `SELECT 
            a.id,
            a.date,
            a.userId,
            t.startTime,
            t.endTime
        FROM appointments a
        JOIN time_blocks t ON a.timeBlockId = t.id
        WHERE a.userId = ?
        ORDER BY a.date ASC`,
        [userId]
  );
  return rows;
};  