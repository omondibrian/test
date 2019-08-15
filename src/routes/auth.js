
/**
 * @fileOverview this is the authorisation routes
 * @author Eucossa
 * @version 0.0.1
 */

const router = require('express').Router();
const AuthController = require('../controller/AuthController');
const verified = require('../middleware/verifyToken');
const admin = require('../middleware/admin');
const multer = require('multer');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
        cb(null, Date.now() + '_' + file.originalname )
    }
})
const filefilter = (req,file,cb)=>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

/**@constant */
const upload = multer({
     storage:storage ,
     limits:{
            fileSize:1024*1024*5
            },
            fileFilter:filefilter        
    });


/**registration route
 * @param req this passes the requests from the user to the server
 * @param res this is the response given back to the client side
 * @example
 * this is accessed via this end point 
 * https:localhost/api/user/register 
 */
router.post('/register',upload.single('profileImage'), AuthController.register_user);


/**login route 
 * @param req
 * @param res
 * this is how the routes param are used
 * @example
 * https:localhost/api/user/login
 * to acess your login authorization token -> AUTH_TOKEN
*/
router.post('/login', AuthController.log_in_user);
router.put('/role',verified,admin,AuthController.changeUserRole);
router.post('/verify', AuthController.activateAccount);
router.get('/',verified,admin,AuthController.getUsers);
router.put('/', upload.single('profileImage'), verified,AuthController.changeUserProfile);
router.post('/forgotpass',AuthController.forgotPass)
module.exports = router ; 