
/**
 * @fileOverview it contains all the eucossa module routes for the application
 * @author Eucossa
 * @version 0.0.1
 */

const express = require('express');
const router = express.Router();
const verify = require('../middleware/verifyToken');
const admin = require('../middleware/admin');
const eventsController = require('../controller/eventsController');
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
 * get events route
 * calls the getpost route handler
 */
router.get('/', eventsController.getEvents);

/**make event route
 * calls the makeNewtevent route handler
 */
router.post('/', upload.single('image'), verify, admin, eventsController.makeNewEvent);

router.get('/:id', eventsController.getSingleEvent);
router.put('/:id', upload.single('image'), verify, admin, eventsController.editEvent);
router.delete('/:id', verify, admin, eventsController.deleteSingleEvent)
module.exports = router;