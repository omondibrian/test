/**
 * @fileOverview  the ModulesRegistrationController contains the functions needed
 * to manege all the modules offered by eucossa community
 * @author Eucossa community
 * @version 0.0.1
 */

const ModuleRegistration = require('../models/moduleRegistration');

exports.getModules = async (req, res, next) => {
    try {
        const modules = await ModuleRegistration.find({});
        let label =[];
       let firstyears=[];
       let secondyears=[];
       let thirdyears=[];
       let fourthyears=[];
        modules.map(modul =>{
            label.push(modul.label);
            firstyears.push(modul.data[0].first);
            secondyears.push(modul.data[0].second);
            thirdyears.push(modul.data[0].third);
            fourthyears.push(modul.data[0].fourth);
        })
        res.json({
            moduleRegistration:{
                label:label,
                dataset:[
                    {
                        label:'1st years',
                        data:firstyears
                    },
                    {
                        label:'2nd years',
                        data:secondyears
                    },
                    {
                        label:'3rd years',
                        data: thirdyears
                    },
                    {
                        label:'4th years',
                        data: fourthyears
                    }
                ]
            },

        }).status(200)
        next();
    } catch (error) {
        res.status(400).json({ message: error })
    }
}

exports.makeNewModule = async (req, res) => {
    console.log(req.body)

    //create a new post
    const module = new ModuleRegistration({
        label:req.body.name,
        data:[
           {
                first: req.body.data.first,
                second: req.body.data.second,
                third: req.body.data.third,
                fourth: req.body.data.fourth,
           }

        ]
    })
    try {//save the post
        const savedmodule = await module.save()
        res.status(200).send({ module_id: savedmodule._id });
    } catch (error) {//catch errors if any
        res.send(error,'could not save record')
    }

}

exports.deleteSingleModule = async (req, res) => {
    const Id = req.params.id
    const modules = await ModuleRegistration.findOneAndRemove({ _id: Id }, { useFindAndModify: false });
    res.json({
        modules: modules,

    }).status(200)
}
exports.editModule = async (req, res, next) => {

    try {
        label = req.params.id
        if (req.body.name) {
            console.log(req.body.data[0].first)
            if (req.body.data[0].first) {
                ModuleRegistration.findOne({ _id: label }).then((res) => {
                    console.log(res)
                });
            
                console.log(`label is ${label}`,req.body.data[0].first)
        }

        if (req.body.data.second) {
             ModuleRegistration.findOne({ label: label }).then((res)=>{
                 console.log(res)
             });

        }

        if (req.body.data.third) {
            await ModuleRegistration.updateOne({ label: label }, { $set: { third: req.body.data.third } });
            
        }
        if (req.body.data.fourth) {
            await ModuleRegistration.updateOne({ label: label }, { $set: { fourth: req.body.data.fourth } });
            
        }
        const updatedModule = await ModuleRegistration.findOne({ label: label });
        res.json({ updatedModule }).status(200);
    }
        next();

    } catch (error) {
        res.status(400).json({ error: error });
    }

}
