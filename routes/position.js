const passport = require('passport');
const express = require('express');

const router = express.Router();
const controller = require('../controllers/position');

router.get('/:categoryId', passport.authenticate('jwt', {session: false}), controller.getByCategoryID);
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.remove);

module.exports = router;