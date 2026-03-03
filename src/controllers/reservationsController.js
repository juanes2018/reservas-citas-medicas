const reservationServices = require('../services/reservationService');


exports.createReservation = async(req, res) => {

    try{
        
         const data = {
            ...req.body,
            userId: req.user.id // 🔥 viene del token
        };
        console.log('DATA FINAL:', data);
        const reservation = await reservationServices.createReservation(data);
        res.status(201).json(reservation);

    }catch(error){
        res.status(400).json({ error: error.message });

    }
};

exports.getReservations = async(req, res) => {
    try{
        const reservations = await reservationServices.getReservations(req.params.id);
        res.status(200).json(reservations);

    }catch(error){
        res.status(404).json({ error: error.message });

    }
};

exports.updateReservation = async(req, res) => {
    try{
        const reservation = await reservationServices.updateReservation(req.params.id, req.body);
        if(!reservation) {
            return res.status(404).json({ error: 'Reservacion no encontrada' });
        }   
        res.status(200).json(reservation);

    }catch(error){
        res.status(400).json({ error: error.message });

    }
};

exports.deleteReservation = async(req, res) => {
    try{
        await reservationServices.deleteReservation(req.params.id);
        res.status(204).send();
        if(!reservation) {
            return res.status(404).json({ error: 'Reservacion no encontrada' });
        }   
        res.status(204).json({ message: 'Reservacion eliminada' });

    }catch(error){
        res.status(404).json({ error: error.message });

    }
};



