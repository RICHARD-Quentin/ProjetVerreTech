import { createRequire } from "module"; 
import urljoin from 'url-join';

const require = createRequire(import.meta.url);
const packageFile = require('../package.json')

const baseUrl = packageFile['erp-verretech'].baseUrl;
const basePathApi = packageFile['erp-verretech'].basePathApi;
const port = packageFile['erp-verretech'].port;    

export default class 
{
    constructor(entryPoint)
    {
        this.entryPoint = entryPoint;
    }

    getUrl(endPoint)
    {
        return endPoint == null ? urljoin(`${baseUrl}:${port}`,basePathApi,this.entryPoint) : urljoin(`${baseUrl}:${port}`,basePathApi,this.entryPoint,endPoint.toString()) ;       
    }
}

export {baseUrl,basePathApi,port}
