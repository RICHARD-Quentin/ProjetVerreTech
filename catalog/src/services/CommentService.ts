import models, {models as db , sequelize} from '../../../common/database'
import { Comment } from '../models/Comment'

export default class 
{
    public async CreateComment(comment:Comment)
    {
        return await models.commentaire.create({
                code_article : comment.code_article,
                id_client : comment.id_client,
                commentaire : comment.commentaire,
                date : comment.date,
                note_client : comment.note_client
        })         
    }

    public async UpdateComment(comment:Comment, id: number)
    {
        return await models.commentaire.update({
                code_article : comment.code_article,
                id_client : comment.id_client,
                commentaire : comment.commentaire,
                date : comment.date,
                note_client : comment.note_client
        },{where :{id_commentaire : id.toString()}})         
    }

    public async GetComment(id: number)
    {          
        return await models.commentaire.findAll({where: { id_commentaire : id.toString()}, include : [
                {model: db.article, as: "article", required: false},
                {model: db.client, as: "client", required: false}
            ]})     
    }

    public async GetComments()
    {          
        return await models.commentaire.findAll({where: {}, include : [
                {model: db.article, as: "article", required: false},
                {model: db.client, as: "client", required: false}
            ]})     
    }

    public async GetCommentsByCustomer(id: number)
    {          
        return await models.commentaire.findAll({where: { id_client : id.toString()}, include : [
                {model: db.article, as: "article", required: false}
            ]})     
    }

    public async GetCommentsByArticle(id: number)
    {          
        return await models.commentaire.findAll({where: { code_article : id.toString()}, include : [
                {model: db.client, as: "client", required: false}
            ]})     
    }

    public async DeleteComment(id: number)
    {         
        return await models.commentaire.destroy({where: { id_commentaire : id.toString()}})     
    }

}