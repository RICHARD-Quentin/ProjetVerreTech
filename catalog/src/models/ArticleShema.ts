import { Schema } from 'express-validator';

export const ArticleShema : Schema= {
    intitule_article: 
    {
        in: ['body'],
        errorMessage: 'Intitule article is wrong',
        isString: true
    },

    dimension_1: 
    {
        in: ['body'],
        errorMessage: 'Dimension 1 is wrong',
        isString: true
    },

    dimension_2: 
    {
        in: ['body'],
        errorMessage: 'Dimension 2 is wrong',
        isString: true
    },

    dimension_3: 
    {
        in: ['body'],
        errorMessage: 'Dimension 3 is wrong',
        isString: true
    },

    couleur: 
    {
        in: ['body'],
        errorMessage: 'Couleur is wrong',
        isString: true
    },

    prix_achat: 
    {
        in: ['body'],
        errorMessage: 'Prix achat is wrong',
        isString: true
    },

    commandable: 
    {
        in: ['body'],
        errorMessage: 'Commandable is wrong',
        isBoolean: true
    },

    note_moyenne: 
    {
        in: ['body'],
        errorMessage: 'Note moyenne is wrong',
        isString: true
    },

    description: 
    {
        in: ['body'],
        errorMessage: 'Description is wrong',
        isString: true
    },

    image: 
    {
        in: ['body'],
        errorMessage: 'Image is wrong',
        isString: true,
        optional: { options: { nullable: true } }
    },
}