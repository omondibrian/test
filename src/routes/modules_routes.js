
/**
 * @fileOverview it contains all the eucossa module routes for the application
 * @author Eucossa
 * @version 0.0.1
 */

const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const admin = require('../middleware/admin');
const modulesController = require('../controller/modulesController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
})
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

/**@constant */
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: filefilter
});

/**
 * get Posts route
 * calls the getpost route handler
 */
router.get('/', modulesController.getModules);

/**make Posts route
 * calls the makeNewtpost route handler
 */
router.post('/', upload.single('image'), verify, admin, modulesController.makeNewModule);

router.get('/:id', modulesController.getSingleModule);
router.put('/:name', upload.single('image'), verify, admin, modulesController.editModule);
router.delete('/:id', verify, admin, modulesController.deleteSingleModule)
module.exports = router;