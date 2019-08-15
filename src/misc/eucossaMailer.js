/**
 * @fileOverview it maneges the mailing services of the system.
 * @author Eucossa
 * @version 0.0.1
 */




const nodemailer = require('nodemailer');
const dotenv= require('dotenv');
dotenv.config();
 const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.USER,
        pass:process.env.PASSWORD
    }  
})


module.exports = {
    /**
     * @param {string} from contains the email address of eucossa
     * @param {string} to contains the email address of the receiver
     * @param {string} subject contains the secreate token to be sent to the receiver
     * @param {string} html the html for the content
     */
    sendemail(from,to,subject,html){
        return new Promise ((resolve,reject) => {
            transport.sendMail({from,subject,to,html},(err,info)=>{
                if(err) reject(err);

                resolve(info);
            })
        })
    }
}