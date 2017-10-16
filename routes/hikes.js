const express = require('express');
const router = express.Router();

const hikeController = require('../controllers/hikeController');

router.post('/', hikeController.create);
router.get('/', hikeController.index);

module.exports = router;

