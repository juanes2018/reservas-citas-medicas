const { Router } = require('express');
const reservationController = require('../controllers/reservationsController');
const authenticaToken = require('../middlewares/auth');


const router = Router();

router.post('/', authenticaToken, reservationController.createReservation);
router.get('/:id', authenticaToken, reservationController.getReservations);
router.put('/:id', authenticaToken, reservationController.updateReservation);
router.delete('/:id', authenticaToken, reservationController.deleteReservation);

module.exports = router;