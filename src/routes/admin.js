const { Router} = require('express');
const { createTimeBlocks, listReservations } = require('../controllers/adminController');
const authenticationToken = require('../middlewares/auth');

const router = Router();

router.post('/time-blocks', authenticationToken, createTimeBlocks);
router.get('/reservations', authenticationToken, listReservations);


module.exports = router;


