import db  from 'database';

export async function createOrder (req, res,next) 
{
    res.set('Content-Type', 'text/html');
    res.send('Commande');
}

export async function getOrdersOfClient (req, res,next) 
{  
    db.commande.findAll({where: { id_client: req.params.id}}).then(result=>
        {
            if(result.length>0)
            {
                res.send(result);
            }
            else
            {
                res.send("Orders not found").status(404);
            }
            
    }).catch(e=> res.send("Internal error").status(500))
}
