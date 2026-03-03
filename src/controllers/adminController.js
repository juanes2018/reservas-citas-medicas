const { 
    createTimeBlockService, 
    listReservationsService 
} = require('../services/adminService');

const createTimeBlocks = async (req, res) => {
    if (req.user.role !== 'admin'){
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    const { startTime, endTime } = req.body;

    try {

        const newTimeBlocks = await createTimeBlockService(startTime, endTime);
        res.status(201).json(newTimeBlocks);


    } catch (error) {
        console.error('🔥 ERROR REAL:', error);
        res.status(500).json({ message: 'Error al crear los bloques de tiempo', error: error.message });

    }
};

const listReservations = async (req, res) => {
      if (req.user.role !== 'admin'){
        return res.status(403).json({ message: 'Acceso denegado' });
    }

    try {
    const reservations = await listReservationsService();
        res.status(200).json(reservations);

    }catch (error) {
        console.error('🔥 ERROR REAL:', error);desc 
        res.status(500).json({ message: 'Error al listar las reservas', error: error.message });

}
};

module.exports = {
    createTimeBlocks,
    listReservations
};  