import app from '../dist/catalog/src/main';
import chai from 'chai';
import chaiHttp from 'chai-http';
import GenerateToken from '..///../common/auth/generator'

chai.use(chaiHttp);
import 'mocha';

let code_article : number
let id_client: number
let id_commentaire: number
let token:string

function VerifyResponseFormApi(body:any)
{
    chai.expect(body.success).to.exist
    chai.expect(body.responseCount).to.exist
    chai.expect(body.response).to.exist
}

describe('Get comments list', () => {
    it('should return response of list of comments article', async () => {
    token = await GenerateToken() 
    return  chai.request(app)
      .get("/comment")
      .set('Authorization', `Bearer ${token}`)
      .then(res => 
        {           
            VerifyResponseFormApi(res.body)
            chai.expect(res.body.response).to.be.a("array")    

            if(res.body.response.responseCount > 0){
                const firstEntry = res.body.response[0]

                code_article = firstEntry.code_article
                id_client = firstEntry.id_client
            }
           
        })
        .catch((err) =>{
            VerifyResponseFormApi(err.response.body)
           
        })      
    })
})


describe('Get comment', () => {
    it('should return response of comment of article', () => {
        return  chai.request(app)
          .get(`/comment/${code_article ?? 9999999}`)
          .set('Authorization', `Bearer ${token}`)
          .then(res => 
            {           
                VerifyResponseFormApi(res.body)
                  
                if(res.body.response.success == true){
                    chai.expect(res.body.response.id_commentaire).to.exist
                    chai.expect(res.body.response.id_commentaire).to.be.a("number") 
                    chai.expect(res.body.response.code_article).to.exist
                    chai.expect(res.body.response.code_article).to.be.a("number") 
                    chai.expect(res.body.response.id_client).to.exist
                    chai.expect(res.body.response.id_client).to.be.a("number") 
                }
               
            })
            .catch((err) =>{
                VerifyResponseFormApi(err.response.body)
               
            })      
        })
})

describe('Create a comment', () => {
    it('should return response of comment created', () => {
        return  chai.request(app)
          .post(`/comment`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            "code_article": code_article ?? 9999999,
             "id_client": id_client ?? 9999999,
             "commentaire": "Ce commentaire provient d'un test unitaire",
             "date": "2021-10-03T18:39:04.911Z",
             "note_client": 10
         })
          .then(res => 
            {           
                VerifyResponseFormApi(res.body)
                  
                if(res.body.response.success == true){
                    chai.expect(res.body.response.id_commentaire).to.exist
                    chai.expect(res.body.response.id_commentaire).to.be.a("number") 
                    id_commentaire = res.body.response.id_commentaire

                    chai.expect(res.body.response.code_article).to.exist
                    chai.expect(res.body.response.code_article).to.be.a("number") 

                    chai.expect(res.body.response.id_client).to.exist
                    chai.expect(res.body.response.id_client).to.be.a("number") 

                    chai.expect(res.body.response.commentaire).to.exist
                    chai.expect(res.body.response.commentaire).to.be.a("string") 
                    chai.expect(res.body.response.commentaire).equal("Ce commentaire provient d'un test unitaire")
                }
               
            })
            .catch((err) =>{
                VerifyResponseFormApi(err.response.body)
               
            })      
        })
})

describe('Update a comment', () => {
    it('should return response of comment updated', () => {
        return  chai.request(app)
          .put(`/comment/${id_commentaire}`)
          .set('Authorization', `Bearer ${token}`)
          .send({
            "code_article": code_article ?? 9999999,
             "id_client": id_client ?? 9999999,
             "commentaire": "Ce commentaire modifié provient d'un test unitaire",
             "date": "2021-10-03T18:39:04.911Z",
             "note_client": 10
         })
          .then(res => 
            {           
                VerifyResponseFormApi(res.body)
                  
                if(res.body.response.success == true){
                    chai.expect(res.body.response.Message).equal("Operation has been completed !")
                }
               
            })
            .catch((err) =>{
                VerifyResponseFormApi(err.response.body)
               
            })      
        })
})


describe('Delete a comment', () => {
    it('should return response of shop created', () => {
      return chai.request(app)
      .delete(`/comment/${id_commentaire}`)
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
