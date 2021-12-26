import app from '../dist/logistic/src/main';
import { expect, should } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
import 'mocha';
import dotenv from 'dotenv'
dotenv.config()

chai.use(chaiHttp);

let code_article : number
let id_client: number
let id_commentaire: number

function VerifyResponseFormApi(body:any)
{
    chai.expect(body.success).to.exist
    chai.expect(body.responseCount).to.exist
    chai.expect(body.response).to.exist
}

describe('Get orders', () => {
  it('should return list of orders', () => {
    return chai.request(app)
    .get("/order")
      .then(res => {
        chai.expect(res.body.response).to.be("array")
      })
   })
})

describe('Create an order', () => {
  it('should return response of order created', () => {
    return chai.request(app)
    .post("/order")
    .send(
      {
      "id_boutique":1,
      "id_client":1,
      "contents": [
          {"code_article":1,"quantité":5},
          {"code_article":2,"quantité":2}
      ],
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
              "id_client":1
          }
      })
      .then(res => {
       
        //First, verify response form from api
        VerifyResponseFormApi(res.body)
   
        //Verification of response
        if(res.body.success == false){
          chai.expect(res.body.response).to.be("array")
        }else{
          chai.expect(res.body.responseCount).equal(1)

          chai.expect(res.body.response.n_commande).to.exist
          chai.expect(res.body.response.n_commande).to.be.a("number")

          chai.expect(res.body.response.id_boutique).to.exist
          chai.expect(res.body.response.id_boutique).to.be.a("number")

          chai.expect(res.body.response.date_commande).to.exist
          chai.expect(res.body.response.date_commande).to.be.a("date")

          chai.expect(res.body.response.date_retrait).to.exist
          chai.expect(res.body.response.date_retrait).to.be.a("date")

          chai.expect(res.body.response.statut).to.exist
          chai.expect(res.body.response.payment).to.exist
        }
       
        //chai.expect(resp.success).to.eql(false);
      })
  })
})

