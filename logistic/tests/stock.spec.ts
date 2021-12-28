import app from '../dist/logistic/src/main';
import { expect, should } from 'chai';
import chai from 'chai';
import chaiHttp from 'chai-http';
import GenerateToken from '..///../common/auth/generator'

chai.use(chaiHttp);
import 'mocha';
import dotenv from 'dotenv'
dotenv.config()


let articleTest = 1
let id_boutique = 1
let no_stock:number ;

let token:string 

function VerifyResponseFormApi(body:any)
{
    chai.expect(body.success).to.exist
    chai.expect(body.responseCount).to.exist
    chai.expect(body.response).to.exist
}

describe('Modify stock', () => {
    it('should return the stock line with article test', async () => {
      token = await GenerateToken() 
      return chai.request(app)
      .put(`/stock`)
      .set('Authorization', `Bearer ${token}`)
      .send({
          code_article:articleTest,
          id_boutique: id_boutique,
          quantité:50
      })
        .then(res => 
        {
          VerifyResponseFormApi(res.body)          
          chai.expect(res.body.success).to.be.equal(true)
          no_stock = res.body.response[0].no_stock
        })
     })
})

describe('Get stock for a article', () => {
  it('should return list of stock for the article', () => {
    return chai.request(app)
    .get(`/stock/article/${articleTest}`)
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

describe('Get stock of shop', () => {
    it('should return list of shop for the article', () => {
      return chai.request(app)
      .get(`/stock/shop/${id_boutique}`)
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

describe('Verify stock', () => {
    it('should return stock updated with substract quantity', () => {
      return chai.request(app)
      .post(`/stock/verify`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        "id_boutique":id_boutique,
        "content": [
            {"code_article":articleTest,"quantité":1}
        ]
    })
        .then(res => 
        {
            VerifyResponseFormApi(res.body)     
            chai.expect(res.body.success).to.be.equal(true)       
            chai.expect(res.body.response.totalPrice).to.be.a("number")
            chai.expect(res.body.response.content).to.be.a("array")            
        })
     })
     it('should return false success', () => {
        return chai.request(app)
        .post(`/stock/verify`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          "id_boutique":id_boutique,
          "content": [
              {"code_article":articleTest,"quantité":999999999999999999999}
          ]
      })
          .then(res => 
          {
            VerifyResponseFormApi(res.body)     
            chai.expect(res.body.success).to.be.equal(false)
          })
       })
})

describe('Delete stock of article test', () => {
    it('modify the stock with article test', () => {
      return chai.request(app)
      .delete(`/stock/${no_stock}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => 
        {
          VerifyResponseFormApi(res.body)    
                
          chai.expect(res.body.success).to.be.equal(true)
        })
     })
})


