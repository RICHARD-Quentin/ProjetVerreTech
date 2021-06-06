import axios from 'axios';
import ErpUrl from '../utils/urlBuilder.js';

const url = new ErpUrl('user');

export default class 
{
  constructor(token)
  {
    this.token = token;
  }

  async Get(username)
  {
    try {
        return await (await axios.get(url.getUrl(username))).data
      } catch (error) {   
        return error.response.data;
      }
  }

  async Delete(username)
  {
    try {
      return await (await axios.delete(url.getUrl(username))).data
    } catch (error) {   
      return error.response.data;
    }
  }

  async Logout()
  {
    try {
      return await (await axios.get(url.getUrl("logout"))).data
    } catch (error) {   
      return error.response.data;
    }
  }

  async Login(username,password)
  {
    try 
    {
        return await (await axios.get(url.getUrl('login'),{auth:{username: username,password: password}}
        )).data
    } catch (error) 
    {   console.log(error)
        return error.response.data;
    }
  }

  async Create(user)
  {
    try 
    {
        return await (await axios.post(url.getUrl(),user)).data
    } catch (error) 
    {   console.log(error)
        return error.response.data;
    }
  }
}

