import app from '../dist/logistic/src/main';
import { expect, should } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import GenerateToken from '..///../common/auth/generator'

chai.use(chaiHttp);
import 'mocha';
import dotenv from 'dotenv'
dotenv.config()

let contents = []
let id_client: number = 1
let id_boutique : number = 1
let orderId: number = 1

let token:string 

function VerifyResponseFormApi(body:any)
{
    chai.expect(body.success).to.exist
    chai.expect(body.responseCount).to.exist
    chai.expect(body.response).to.exist
}

describe('Get all orders', () => {
    it('should return list of orders', async() => {
      token = await GenerateToken() 
      console.log(token)
      const res = await chai.request(app)
      .get("/logistic/order")
      .set('Authorization', `Bearer ${token}`)

          VerifyResponseFormApi(res.body)     
          
          if(res.body.responseCount > 0 && res.body.success == true)
          {
            chai.expect(res.body.response).to.be.a("array")
            orderId = res.body.response[0].n_commande       
          }
        
     })
})



describe('Get a order', () => {
  it('should return order with id', () => {
    return chai.request(app)
    .get(`/logistic/order/${orderId}`)
    .set('Authorization', `Bearer ${token}`)
      .then(res => 
      {
        VerifyResponseFormApi(res.body)       
        
        if(res.body.success == true)
        {
          id_client = res.body.response.id_client
          id_boutique = res.body.response.id_boutique
          contents = res.body.response.contenus.map(article => {            
                return article.code_article            
            })         
        }
       

      })
   })
})

describe('Get orders of customer', () => {
  it('should return orders list of customer with an id', () => {
    return chai.request(app)
    .get(`/logistic/order/client/${id_client}`)
    .set('Authorization', `Bearer ${token}`)
      .then(res => 
      {
        VerifyResponseFormApi(res.body)       
        
        if(res.body.success == true)
        {
          chai.expect(res.body.response).to.be.a("array")              
        }

      })
   })
})

describe('Create an order', () => {
  it('should return response of order created', () => {
    return chai.request(app)
    .post("/logistic/order")
    .set('Authorization', `Bearer ${token}`)
    //.set({ Authorization: `Bearer ${token}` })
    .send(
      {
      "invoice": {"id_pays":1,"id_ville":1,"adresse":"adresse de test"},
      "id_boutique":id_boutique,
      "id_client":id_client,
      "contents":contents,
      "date_retrait":"2021-10-03T18:39:04.911Z",
      "payment": 
          {
              "params":
              {
                  "payerID":"9T8M2JEDR9P92",
                  "paymentID":"PAYID-MFSWM3Q7PG67674RB873241U",
                  "paymentToken":"EC-45U139152R760821U"
              },
              "method": "None",
              "id_client":id_client
          }
      })
      .then(res => {
       
        VerifyResponseFormApi(res.body)
   
        if(res.body.success == false){
          chai.expect(res.body.response).to.be.a("array")
        }else{
          chai.expect(res.body.responseCount).equal(1)

          chai.expect(res.body.response.n_commande).to.exist
          chai.expect(res.body.response.n_commande).to.be.a("number")

          chai.expect(res.body.response.id_boutique).to.exist
          chai.expect(res.body.response.id_boutique).to.be.a("number")

          chai.expect(res.body.response.statut).to.exist
          chai.expect(res.body.response.payment).to.exist
        }

      })
  })
})

