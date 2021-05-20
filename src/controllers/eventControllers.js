const Event = require('../models/event');

exports.createNewEvent = (req, res) => {
    Event.create({
        id: req.body.id,
        title: req.body.title,
        cost: req.body.cost,
        category: req.body.category
    }, (err, newEvent) =>{
        if(err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: "new event created", newEvent})
        }
    })
}

exports.fetchEvents = (req, res) => {
    let conditions = {};
    if(req.query.category) {
        conditions.category = req.query.category
    }
    Event.find(conditions, (err, events) => {
        if(err) {
            return res.status(500).json({message: err});
        } else {
            return res.status(200).json({events});
        }
    })
}

exports.fetchSingleEvent = (req, res) => {
    Event.findOne({_id: req.params._id}, (err, event) => {
        if(err) {
            return res.status(500).json({message: err});
        } else if(!event) {
            return res.status(404).json({message: `event not found`})
        } else {
            return res.status(200).json({event})
        }
    });
}

exports.updateSingleEvent = (req, res) => {
    Event.findByIdAndUpdate(req.params._id, {
    title: req.body.title,
    cost: req.body.cost,
    category: req.body.category
    }, (err, event) =>{
        if(err) {
            return res.status(500).json({message: err})
        } else if(!event) {
            return res.status(404).json({message: `event not found`})
        } else {
            event.save((err, savedEvent) => {
                if(err) {
                    return res.status(400).json({message: err})
                } else {
                    res.status(200).json({message: `event updated successfully`})
                }
            });
        }
    })
}

exports.deleteSingleEvent = (req, res) => {
    Event.findByIdAndDelete(req.params.id, (err, event) =>{
        if(err) {
            return res.status(500).json({message: err})
        } else if (!event) {
            return res.status(404).json({message: `event not found`})
        } else {
            return res.status(200).json({message: `event deleted successfully`})
        }
    })
}
