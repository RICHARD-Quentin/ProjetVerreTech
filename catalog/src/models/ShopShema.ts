import { Schema } from 'express-validator';

export const ShopShema : Schema= {
    intitule: 
    {
        in: ['body'],
        errorMessage: 'intitule field is wrong or missing',
        isString: true
    },

    enseigne: 
    {
        in: ['body'],
        errorMessage: 'enseigne field is wrong or missing',
        isString: true
    },

    adresse_magasin: 
    {
        in: ['body'],
        errorMessage: 'adresse_magasin field is wrong or missing',
        isString: true
    },
}