/**
 * @fileOverview  the ModulesController contains the functions needed
 * to manege all the modules offered by eucossa community
 * @author Eucossa community
 * @version 0.0.1
 */

const Module = require('../models/modules');

exports.getModules = async (req, res,next) => {
    try {
        const modules = await Module.find({});
        res.json({
            modules: modules,
            
        }).status(200)
        next();
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

exports.makeNewModule = async (req, res) => {


    //create a new post
    const module = new Module({
        name: req.body.name,
        description: req.body.description,
        fee: req.body.fee,
        image: req.file.path,
        registrationLink:req.body.registrationLink
    })
    try {//save the post
        const savedmodule = await module.save()
        res.status(200).send({ module_id: savedmodule._id });
    } catch (error) {//catch errors if any
        res.status(400).send(error)
    }

}
exports.getSingleModule = async (req, res) => {
    const Id = req.params.id
    const modules = await Module.findOne({ _id: Id });
    res.json({
        modules: modules,
    }).status(200)
}
exports.deleteSingleModule = async (req, res) => {
    const Id = req.params.id
    const modules = await Module.findOneAndRemove({ _id: Id }, { useFindAndModify: false });
    res.json({
        modules: modules,
        
    }).status(200)
}
exports.editModule = async (req, res, next) => {

    try {
        name = req.params.name
        if (req.body.name) {
            console.log(req.body.name)
            await Module.updateOne({ name: name }, { $set: { name: req.body.name } });
        }
        if (req.body.description) {
            await Module.updateOne({ name: name }, { $set: { description: req.body.description } });

        }
        if (req.body.fee) {
            await Module.updateOne({ name: name }, { $set: { fee: req.body.fee } });

        }
        if (req.file) {
            await Module.updateOne({ name:name }, { $set: { image: req.file.path } });
            console.log(req.file)
        }
        const updatedModule = await Module.findOne({ name: name });
        res.json({ updatedModule }).status(200);

        next();
   
    } catch (error) {
        res.status(400).json({ error: error });
    }

}
