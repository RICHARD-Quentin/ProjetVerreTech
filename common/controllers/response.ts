import express, {  Response,Request } from 'express';
import {validationResult} from 'express-validator';

export interface ResponseForm {
    success : Boolean
    response: object;
    responseCount: number
    
}

export function SendResponse(method:Function, response:Response, request:Request, ...args:any)
{
    let responseForm : ResponseForm = {
        success : false,
        response : {},
        responseCount : 0
    };

    if(validationResult(request).array().length > 0)
    {
        responseForm.success = false;
        responseForm.responseCount = validationResult(request).array().length
        responseForm.response = validationResult(request).array()

        return response.status(400).send(responseForm)
    }

    method.apply(method,args).then((result:any) => 
    {
        if(result == 0){
            responseForm.success = false;
            responseForm.responseCount = 1
            responseForm.response = {Message : "No modification has been applied"}
        }else if(result == 1){
            responseForm.success = true;
            responseForm.responseCount = 1
            responseForm.response = {Message : "Operation has been completed !"}
        }
        else if(result == null){
                responseForm.success = false;
                responseForm.responseCount = 0
                responseForm.response = {Message : "No result !"}           
        }else{
            responseForm.success = true;
            responseForm.responseCount = Array.isArray(result) ? result.length : 1;
            responseForm.response = result
        }
        return response.status(200).send(responseForm);

    }).catch((error:any)=> {
        responseForm.success = false;
        responseForm.response = error;
        responseForm.responseCount = 1;
        return response.status(400).send(responseForm)
    })
 
}