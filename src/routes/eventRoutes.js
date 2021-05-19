const express = require('express');
const router = express.Router();
const EventController = require('../controllers/eventControllers')
//POST REQUEST TO CREATE A NEW EVENT
router.post('/events', EventController.createNewEvent);
// GET REQUEST TO FETCH ALL EVENTS
router.get('/events', EventController.fetchEvents);
// GET REQUEST TO FETCH A SINGLE EVENT
router.get('/events/:id', EventController.fetchSingleEvent);
// PUT REQUEST TO UPDATE A EVENT
router.put('/events/:id', EventController.updateSingleEvent);
//DELETE A REQUEST TO DELETE A EVENT
router.delete('/events/:id', EventController.deleteSingleEvent);

module.exports = router;
