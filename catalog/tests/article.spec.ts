import app from '../dist/catalog/src/main';
import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
import 'mocha';
import { doesNotMatch } from 'assert';
import GenerateToken from '..///../common/auth/generator'

let code_article: number;
let token:string

function VerifyResponseFormApi(body:any)
{
    chai.expect(body.success).to.exist
    chai.expect(body.responseCount).to.exist
    chai.expect(body.response).to.exist
}

describe('Create a article', () => {
    it('should return response of article created',async () => {
        token = await GenerateToken() 
      return  chai.request(app)
      .post("/article")
      .set('Authorization', `Bearer ${token}`)
      .send({
        "intitule_article": "Article UnitTest",
        "image": "",       
        "dimension_1": "125",
        "dimension_2": "125",
        "dimension_3": "525",
        "couleur": "rouge",
        "prix_achat": "198.52",
        "commandable": true,
        "note_moyenne": "4",
        "description": "Cet article provient d'un test unitaire."
    }).then(res => 
        {           
            VerifyResponseFormApi(res.body)
            chai.expect(res.body.response.code_article).to.exist
            chai.expect(res.body.response.code_article).to.be.a("number")              
            code_article = res.body.response.code_article
        })
        .catch((err) =>{
            console.log(err)
            VerifyResponseFormApi(err.response.body)
           
        })      
    })
})

describe('Update a article', () => {
    it('should return response of shop updated', () => {
      return chai.request(app)
      .put(`/article/${code_article}`)
      .set('Authorization', `Bearer ${token}`)
      .send(
          {
            "intitule_article": "Article UnitTest modified",
            "image": "",       
            "dimension_1": "125",
            "dimension_2": "125",
            "dimension_3": "525",
            "couleur": "rouge",
            "prix_achat": "198.52",
            "commandable": true,
            "note_moyenne": "4",
            "description": "Cet article provient d'un test unitaire."
        })
      .then(res => 
        {           
            VerifyResponseFormApi(res.body)
            chai.expect(res.body.response.Message).equal("Operation has been completed !")
        })
        .catch((err) =>{
            VerifyResponseFormApi(err.response.body)
           
        })      
    })
})

describe('Get a article', () => {
    it('get a article', () => {
      return chai.request(app)
      .get(`/article/${code_article}`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => 
        {
            VerifyResponseFormApi(res.body)
            chai.expect(res.body.response.code_article).to.exist
            chai.expect(res.body.response.code_article).to.be.a("number")   
            //chai.expect(res.body.response.code_article).equal(code_article)

            chai.expect(res.body.response.intitule_article).to.exist
            chai.expect(res.body.response.intitule_article).to.be.a("string")
            chai.expect(res.body.response.intitule_article).equal("Article UnitTest modified")

            chai.expect(res.body.response.image).to.exist
            chai.expect(res.body.response.image).to.be.a("string")
      
        })
        .catch((err) =>{
            console.log(err)
            VerifyResponseFormApi(err.response.body)           
        })      
    })
})

describe('Get all articles', () => {   
    it('get all articles', () => {
      return chai.request(app)
      .get(`/article`)
      .set('Authorization', `Bearer ${token}`)
      .then(res => 
        {            
            VerifyResponseFormApi(res.body)
            chai.expect(res.body.response).to.be.a("array")                        
        })
        .catch((err) =>{
            VerifyResponseFormApi(err.response.body)           
        })      
    })
})

describe('Delete article', () => {
    it('should return response of shop deleted', () => {
      return chai.request(app)
      .delete(`/article/${code_article}`)
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


