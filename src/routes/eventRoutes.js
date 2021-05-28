const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventControllers');
const {authenticateUser, checkIfAdmin} = require('../middlewares/authentication')
//POST REQUEST TO CREATE A NEW EVENT
router.post('/events', authenticateUser, EventController.createNewEvent);
// GET REQUEST TO FETCH ALL EVENTS
router.get('/events', authenticateUser, EventController.fetchEvents);
// GET REQUEST TO FETCH A SINGLE EVENT
router.get('/events/:_id', authenticateUser, EventController.fetchSingleEvent);
// PUT REQUEST TO UPDATE A EVENT
router.put('/events/:_id', authenticateUser, checkIfAdmin, EventController.updateSingleEvent);
//DELETE A REQUEST TO DELETE A EVENT
router.delete('/events/:id', authenticateUser, checkIfAdmin, EventController.deleteSingleEvent);

module.exports = router;
