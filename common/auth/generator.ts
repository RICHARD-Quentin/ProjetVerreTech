import axios from 'axios'
import jwt, { RequestHandler } from "express-jwt";

const token_url:string = "https://kradihsoy.eu.auth0.com/oauth/token"

export default async function() {
    const res = await axios.post(token_url, {        
            client_id: "Vk9bvxeU0pYFmBNZuQ1gNawJgoE1tzYW",
            client_secret:"DwqI1plaEy7Mtq0gaHgWcxxN_-jFLbPd-rG15IkmBzyN6I98p_7vKRtWVHjZOX6B",
            audience:"https://verretech/api",
            grant_type:"client_credentials"          
    })
    return   res.data.access_token
}