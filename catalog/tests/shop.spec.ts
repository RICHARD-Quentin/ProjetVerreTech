import app from '../dist/catalog/src/main';
import chai from 'chai';
import chaiHttp from 'chai-http';
import GenerateToken from '..///../common/auth/generator'

chai.use(chaiHttp);
import 'mocha';
import { doesNotMatch } from 'assert';

let id_boutique :number;
let token:string

function VerifyResponseFormApi(body:any)
{
    chai.expect(body.success).to.exist
    chai.expect(body.responseCount).to.exist
    chai.expect(body.response).to.exist
}

describe('Create a shop', () => {
    it('should return response of shop created', async () => {
    token = await GenerateToken() 
      return  chai.request(app)
      .post("/shop")
      .set('Authorization', `Bearer ${token}`)
      .send({
        "intitule": "Boutique UnitTest",
        "enseigne": "Boutique UnitTest",       
        "adresse_magasin": "1 rue des tests"
    }).then(res => 
        {           
            VerifyResponseFormApi(res.body)
            chai.expect(res.body.response.id_boutique).to.exist
            chai.expect(res.body.response.id_boutique).to.be.a("number")              
            id_boutique = res.body.response.id_boutique
        })
        .catch((err) =>{
            VerifyResponseFormApi(err.response.body)
           
        })      
    })
})

describe('Get a shop', () => {
    it('get shop created', () => {
      return chai.request(app)
      .get(`/shop/${id_boutique}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => 
        {
            VerifyResponseFormApi(res.body)
            chai.expect(res.body.response.id_boutique).to.exist
            chai.expect(res.body.response.id_boutique).to.be.a("number")    
            chai.expect(res.body.response.intitule).to.exist
            chai.expect(res.body.response.intitule).to.be.a("string")
            chai.expect(res.body.response.intitule).equal("Boutique UnitTest")
            chai.expect(res.body.response.enseigne).to.exist
            chai.expect(res.body.response.enseigne).to.be.a("string")
            chai.expect(res.body.response.enseigne).equal("Boutique UnitTest")
            chai.expect(res.body.response.adresse_magasin).to.exist
            chai.expect(res.body.response.adresse_magasin).to.be.a("string")
            chai.expect(res.body.response.adresse_magasin).equal("1 rue des tests")
        })
        .catch((err) =>{
            console.log(err)
            VerifyResponseFormApi(err.response.body)           
        })      
    })
})

describe('Get shop list', () => {
    it('get list of shops', () => {
      return chai.request(app)
      .get(`/shop`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => 
        {
            VerifyResponseFormApi(res.body)
            chai.expect(res.body.response).to.be.a("array")    
        })
        .catch((err) =>{
            console.log(err)
            VerifyResponseFormApi(err.response.body)           
        })      
    })
})

describe('Modifiy a shop', () => {
    it('should return response of shop updated', () => {
      return chai.request(app)
      .put(`/shop/${id_boutique}`)
      .set('Authorization', `Bearer ${token}`)
      .send(
          {
            "intitule": "Boutique UnitTest",
            "enseigne": "Boutique UnitTest Updated",
            "adresse_magasin": "1 rue des tests"
        })
      .then(res => 
        {
            chai.expect(res).to.have.property('body');
            VerifyResponseFormApi(res.body)
            chai.expect(res.body.response.Message).equal("Operation has been completed !")
        })
        .catch((err) =>{
            VerifyResponseFormApi(err.response.body)
           
        })      
    })
})

describe('Delete a shop', () => {
    it('should return response of shop created', () => {
      return chai.request(app)
      .delete(`/shop/${id_boutique}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => 
        {
            chai.expect(res).to.have.property('body');
            VerifyResponseFormApi(res.body)
        })
        .catch((err) =>{
            VerifyResponseFormApi(err.response.body)
          
        })      
    })
})

