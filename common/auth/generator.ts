import axios from 'axios'
import jwt, { RequestHandler } from "express-jwt";

const token_url:string = "https://fenrirproject.eu.auth0.com/oauth/token"

export default async function() {
    const res = await axios.post(token_url, {        
            client_id: "W8z4L6ey39u556desXZrPupIpZAW76m7",
            client_secret:"nudC6rSwcu33iVcgfWSKFPTFcsQne87x2BLlWJ7MHynxMjX2QrC4hKhup1DpRUga",
            audience:"https://verretech/api",
            grant_type:"client_credentials"          
    })
    return   res.data.access_token
}
