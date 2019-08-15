/**
 * @fileOverview contains the various functions to manage the users route.
 * @author Eucossa
 * @version 0.0.1
 */

const User = require('../models/users')
const { registerValidation, loginValidation } = require('../misc/validation')
const bcrpt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const randomstring = require('randomstring');
const mailer = require('../misc/eucossaMailer');

/**
 * @param req
 * @param res
 */
exports.register_user = async (req, res) => {
    
    //validate the user input
    /**@constant error this is returned by the registerValidation */
    const { error } = registerValidation(req.body);
    if (error) return res.send(error.details[0].message).status(422);

    //check if the email already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) return res.status(422).send('email already exists');

    //encrpte the password
    const salt = await bcrpt.genSalt(10);
    const encrptedPass = await bcrpt.hash(req.body.password, salt);
    //generate a random string
    /**@constant */ 
    const secreateToken = randomstring.generate();
    //flag the account as inactive
    console.log(req.file)
    //create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: encrptedPass,
        regNumber:req.body.regNumber,
        secreateToken:secreateToken,
        profileImage: req.file.path,
        dateOfBirth:req.body.dateOfBirth
        
    })
    try {
        //save the user
         await user.save();
        //compose an email
        const html = `
        Hello ${req.body.name},<br/>
        Thank you for registering with eucossa  <br/>
        to acivate your account and complete the registration process
        please enter the following token<br/>
        Token:${secreateToken}<br/>
        Have a nice day.
        `
        //send the email
         await mailer.sendemail('eucossaplatform@gmail.com',req.body.email,'EMAIL VERIFICATION',html);
        res.status(200).send({ message: 'please check your email' });
    } catch (error) {//catch errors if any
        res.status(400).send(error).send('email already exits')
    }

}
exports.log_in_user = async (req, res) => {
try {

    //validate the user input
    const { error } = loginValidation(req.body);
    if (error) return res.send(error.details[0].message);


    //check if the email doesn't exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Error authenticating please try again");

    //check if password is correct
    const validPass = await bcrpt.compare(req.body.password, user.password);
    if (!validPass) return res.status(422).send('Error authenticating please try again');

    //check if account is active
    if (!user.active) return res.status(400).json({ message: 'Please activate your account first' });
    //create and assing an authentification token
    const token = jwt.sign({ _id: user._id }, process.env.SECREATE_TOKEN)
    res.header('AUTH_TOKEN', token).send(token ).status(200)

    
} catch (error) {
    res.status(400).json({message:error})
}
}
/**used to change the role of the particular user */
exports.changeUserRole = async (req,res,next)=>{
  try {
      console.log(req.body.id)
      const user = await User.update({ _id: req.body.id }, { $set: { role: 'admin' } });
      res.status(200).json({
          user
      })
  } catch (error) {
      next(error)
  }
}
/**this function is used to activate newly created accounts */
exports.activateAccount = async (req, res,next) => {
   try {
       /**@constant */
       const { secreateToken } = req.body;
       //find the specific user to whom the secreate token belongs to
       /**@constant */
       const inactiveUser = await User.findOne({ secreateToken: secreateToken });
       if (!inactiveUser) return res.status(404).json({
           message: 'User not Found please ensure that the token is correct'
       })
       //if the user is there we activate the account
       inactiveUser.active = true;
       inactiveUser.secreateToken = '';
       await inactiveUser.save();
       res.status(200).json({ message: "successfully activated your account" }); 
   } catch (error) {
       next(error);
   }

}
exports.getUsers = async(req,res,next)=>{
    try {
        const users = await User.find({});
        if(!users) return res.json({message:" users not found"}).status(404);
        res.send(users).status(200);
        next();
    } catch (error) {
        res.status(400).send('error getting users')
    }

}

/**@deprecated */
exports.getUser = async (req,res,next)=>{
    try {
        const singleUser = await User.findOne({ regNumber : req.params.reg});
        if(!singleUser) return res.json({message:" User not found"}).status(404);
        res.json({singleUser}).status(200);
        next();
    } catch (error) {
        res.status(400).send('error getting user')
    }

}

exports.changeUserProfile = async (req,res,next) =>{
    try {
        const { _id } = req.user;
        if(req.body.password){
            //encrpte the password
            const salt = await bcrpt.genSalt(10);
            const encrptedPass = await bcrpt.hash(req.body.password, salt);
            await User.updateOne({ _id: _id }, { $set: { password: encrptedPass } });
        }
        else{
            await User.updateOne({ _id: _id }, { $set: { profileImage: req.file.path } });
        }
       
        const updatedProfile =  await User.findOne({_id});
        res.json({updatedProfile}).status(200);
        next();
    } catch (error) {
        res.status(400).send('error while updating profile')

    }
}
exports.forgotPass = async(req,res,next) =>{
    try {
        const { email } = req.body;
        const secreateToken = randomstring.generate(7);
        //encrpte the password
        const salt = await bcrpt.genSalt(10);
        const encrptedPass = await bcrpt.hash(secreateToken, salt);
        await User.updateOne({ email: email }, { $set: { password: encrptedPass } });
        const user= await User.findOne({ email: email })
        //compose an email
        const html = `
        Hello ${user.name},<br/>
        please enter the verification code below to acess your account
        please enter the following token<br/>
        Token:${secreateToken}<br/>
        Have a nice day.
        `
        //send the email
       await mailer.sendemail('eucossaplatform@gmail.com',req.body.email,'Password Reset Request',html)
        res.json({ message:"password changed successfully please check your email",secreateToken:secreateToken }).status(200);
    } catch (error) {
      next(error);  
    }
}