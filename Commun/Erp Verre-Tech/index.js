import Article from "./endpoints/article.js"; 
import Store from "./endpoints/store.js"; 
import User from "./endpoints/user.js";

export default class 
{
  constructor(username = undefined,password = undefined)
  {
    this.store = new Store();
    this.article = new Article();
    this.user = new User();

    if(username !== undefined && password !== undefined)
    {
      return (async () => 
      {        
        //const resultToken = await this.user.Login(username,password);
        //if(resultToken === undefined)return this;

        //this.store.token = this.article.token = this.user = resultToken['Bearer-Token'];

        return this; 
      })();
    }
    
  }

}

