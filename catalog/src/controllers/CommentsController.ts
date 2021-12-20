import { Request, Response } from "express";
import {validationResult} from 'express-validator';
import { Body, Delete, Get, Path, Post, Put, Route, Tags } from "tsoa";
import { Comment } from "../models/Comment";
import { Shop } from "../models/Shop";
import CommentService from "../services/CommentService";

const commentService = new CommentService()

@Route("comment")
@Tags("comments")
export class CommentsController{
    
    @Get('{id}')
    public async GetComment(@Path() id:number): Promise<any> 
    {
        return await commentService.GetComment(id)
    }

    @Get()
    public async GetAll(): Promise<any> 
    {
        return await commentService.GetComments()
    }

    @Post()
    public async CreateComment(@Body() comment: Comment): Promise<any> 
    {
        return await commentService.CreateComment(comment)
    }

    @Put('{id}')
    public async Update(@Body() comment : Comment, @Path() id :number): Promise<any> 
    {
       return await commentService.UpdateComment(comment,id)
    }

    @Delete('{id}')
    public async Delete(@Path() id:number): Promise<any> 
    {
        return await commentService.DeleteComment(id)
    }
}