import axios from 'axios';
import ErpUrl from '../utils/urlBuilder.js';

const url = new ErpUrl('article');

export default class 
{
  constructor(token)
  {
    this.token = token;
  }

  async Get(articleId)
  {
    try {
      return await (await axios.get(url.getUrl(articleId))).data
    } catch (error) {   
      console.log(error)
      return error.response.data;
    }
  }

  async Delete(articleId)
  {
    try {
      return await (await axios.delete(url.getUrl(articleId))).data
    } catch (error) {   
      return error.response.data;
    }
  }

  async Add(articleObject)
  {
    try {
      return await (await axios.post(url.getUrl(),articleObject)).data
    } catch (error) {   
      return error.response.data;
    }
  }

  async Update(articleId,articleObject)
  {
    try {
      return await (await axios.post(url.getUrl(articleId),articleObject)).data
    } catch (error) {        
      return error.response.data;
    }
  }

  async UpdateExistingArticle(articleObject)
  {
    try {
      return await (await axios.put(url.getUrl(),articleObject)).data
    } catch (error) {   
      return error.response.data;
    }
  }

  async FindArticlesByStatus(status)
  {
    const data = {
      status: status
    };

  try {
      return await (await axios.get(url.getUrl('findByStatus'),{data})).data
    } catch (error) {   
      return error.response.data;
    }
  }

  async UploadImage(articleId,formData)
  {
    try {
      return await (await axios.post(url.getUrl(`${articleId}/uploadImage`),`{file: "${formData}"}`)).data
    } catch (error) {   
      return error.response.data;
    }
  }

}
