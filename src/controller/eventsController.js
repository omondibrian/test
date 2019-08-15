/**
 * @fileOverview  the EventsController contains the functions needed
 * to manege all the Events offered by eucossa community
 * @author Eucossa community
 * @version 0.0.1
 */

const Event = require('../models/events');

exports.getEvents = async (req, res, next) => {
    try {
        const Events = await Event.find({});
        res.json({
            Events: Events,

        }).status(200)
        next();
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

exports.makeNewEvent = async (req, res) => {


    //create a new event
    const event = new Event({
        name: req.body.name,
        description: req.body.description,
        image: req.file.path,
        confirm:req.body.confirm
    })
    try {//save the event
        const savedEvent = await event.save()
        res.status(200).send({ Event_id: savedEvent._id });
    } catch (error) {//catch errors if any
        res.status(400).send(error)
    }

}
exports.getSingleEvent = async (req, res) => {
    const Id = req.params.id
    const Events = await Event.findOne({ _id: Id });
    res.json({
        Events: Events,
    }).status(200)
}
exports.deleteSingleEvent = async (req, res) => {
    const Id = req.params.id
    const Events = await Event.findOneAndRemove({ _id: Id }, { useFindAndModify: false });
    res.json({
        Events: Events,

    }).status(200)
}
exports.editEvent = async (req, res, next) => {

    try {
        id = req.params.id
        if (req.body.name) {
            
            await Event.updateOne({ _id: id }, { $set: { name: req.body.name } });
        }
        if (req.body.description) {
            await Event.updateOne({ _id: id }, { $set: { description: req.body.description } });

        }
        if (req.file) {
            await Event.updateOne({ _id: id }, { $set: { image: req.file.path } });
          
        }
        const updatedEvent = await Event.findOne({ _id: id });
        res.json({ updatedEvent }).status(200);

        next();
    } catch (error) {
        res.status(400).json({ error: error });
    }

}
