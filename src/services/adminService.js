const pool = require('../config/db');


const createTimeBlockService = async (startTime, endTime) => {

    const timeBlocks = [];

    let currentTime = new Date(startTime);

    while (currentTime < new Date(endTime)) {
        const nextTime = new Date(currentTime.getTime() + 30 * 60000); // Agrega 30 minutos
        if (nextTime > new Date(endTime)) break;

           const [result] = await pool.query(
            'INSERT INTO time_blocks (startTime, endTime) VALUES (?, ?)',
            [
                currentTime.toISOString().slice(0, 19).replace('T', ' '),
                nextTime.toISOString().slice(0, 19).replace('T', ' ')
            ]
        );


               timeBlocks.push({
            id: result.insertId,
            startTime: currentTime.toISOString().slice(0, 19),
            endTime: nextTime.toISOString().slice(0, 19)
        });

        currentTime = nextTime;
    }

    return timeBlocks;
     

};


const listReservationsService = async () => {
 const [rows] = await pool.query(`
        SELECT 
            a.id AS appointmentId,
            u.id AS userId,
            u.name AS name,
            u.email AS email,
            t.id AS timeBlockId,
            t.startTime,
            t.endTime
        FROM appointments a
        JOIN users u ON a.userId = u.id
        JOIN time_blocks t ON a.timeBlockId = t.id
    `);

    return rows;
 
};

module.exports = {
    createTimeBlockService,
    listReservationsService
};  