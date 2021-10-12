import {Worker} from "worker_threads"
import db  from 'database';
import moment from 'moment';

function intervalVerificationOrder() 
{   
    db.commande.findAll({where: { date_retrait: {$gte: moment().subtract(3, 'hours').toDate()}}}).then(result=>
        {
         
               
            
    }).catch(e=> console.log("Bad request "+e))
  }

//setInterval(intervalVerificationOrder, 1000 * 60 * 60); //Every hour
setInterval(intervalVerificationOrder, 1500);