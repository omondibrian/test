
/**
 * @fileOverview it contains all the eucossa module routes for the application
 * @author Eucossa
 * @version 0.0.1
 */

const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const admin = require('../middleware/admin');
const moduleRegistrationController = require('../controller/moduleRegistrationController');


/**
 * 
 * calls the getpost route handler
 */
router.get('/', moduleRegistrationController.getModules);

/**
 * calls the makeNewtpost route handler
 */
router.post('/', verify, admin, moduleRegistrationController.makeNewModule);


router.put('/:id', verify, admin, moduleRegistrationController.editModule);
router.delete('/:id', verify, admin, moduleRegistrationController.deleteSingleModule)
module.exports = router;