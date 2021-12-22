import { Schema } from 'express-validator';

export const CommentShema : Schema= {
    code_article: 
    {
        in: ['body'],
        errorMessage: 'code_article field is wrong or missing',
        isInt: true
    },

    id_client: 
    {
        in: ['body'],
        errorMessage: 'id_client field is wrong or missing',
        isInt: true
    },

    commentaire: 
    {
        in: ['body'],
        errorMessage: 'commentaire field is wrong or missing',
        isString: true
    },

    date: 
    {
        in: ['body'],
        errorMessage: 'date field is wrong or missing',
        isISO8601: true
    },

    note_client: 
    {
        in: ['body'],
        errorMessage: 'note_client field is wrong or missing',
        isInt: true
    },
}