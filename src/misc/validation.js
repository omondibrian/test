/**
 * @fileOverview it contains all the functions needed to validate the users data
 * @author Eucossa
 * @version 0.0.1
 */



//validation
const joi = require('@hapi/joi');

/**validate registration data */
function registrationValidation(data) {
    const schema = {
        name: joi.string().min(6).required(),
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required(),
        regNumber: joi.string().min(12).required().max(15),
        dateOfBirth:joi.string().required()
    };
  return joi.validate(data, schema);
}
/**validate login data */
function loginValidation(data) {
    const schema = {
        email: joi.string().min(6).required().email(),
        password: joi.string().min(6).required()
    };
  return joi.validate(data, schema);
}


module.exports.registerValidation = registrationValidation;
module.exports.loginValidation = loginValidation;
