import axios from 'axios';
import ErpUrl from '../utils/urlBuilder.js';

const url = new ErpUrl('store');

export default class 
{
  constructor(token)
  {
    this.token = token;
  }

  async GetOrder(orderId)
  {
      try 
      {
        return await (await axios.get(url.getUrl(`order/${orderId}`))).data
      } 
      catch (error) 
      {
          return error.response.data;        
      }    
  }
  
  async DeleteOrder(orderId)
  {
    try {
      return await (await axios.delete(url.getUrl(`order/${orderId}`))).data
    } catch (error) {   

      return error.response.data;
    }
  }

  async PlaceOrder(orderObject)
  {
    try 
    {
      return await (await axios.post(url.getUrl('order'),orderObject)).data
    } 
    catch (error) 
    {   
      return error.response.data;
    }
  }

  async GetInventory()
  {
    try 
    {
      return await (await axios.get(url.getUrl("inventory"))).data
    } 
    catch (error) 
    {   
console.log(error)
      return error.response.data;
    }
  }
}

