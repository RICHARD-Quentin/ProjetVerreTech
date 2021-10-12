export const swaggerDocument = {
    openapi: '3.0.1',
    info: {
        version: '1.0.0',
        title: 'APIs Order',
        description: 'Micro-service de gestion des commandes.',
        termsOfService: '',
        contact: {
            name: 'FenrirProject',
            email: 'son.hoang01@gmail.com',
            url: 'https://hoangtran.co'
        },
        license: {
            name: 'Apache 2.0',
            url: 'https://www.apache.org/licenses/LICENSE-2.0.html'
        },
        
    },
    servers: [
        {
          url: "http://localhost:3000/order",
        },
    ],
    schemas:{
        id: {
            type: "string", // data type
            description: "An id of a todo", // desc
            example: "tyVgf", // example of an id
          },
        Todo: {
            type: "object", // data type
            properties: {
              id: {
                type: "string", // data-type
                description: "Todo identification number", // desc
                example: "ytyVgh", // example of an id
              },
              title: {
                type: "string", // data-type
                description: "Todo's title", // desc
                example: "Coding in JavaScript", // example of a title
              },
              completed: {
                type: "boolean", // data type
                description: "The status of the todo", // desc
                example: false, // example of a completed value
              },
            },
          },
    }
    
}