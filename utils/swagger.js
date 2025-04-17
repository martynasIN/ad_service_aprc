import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Ads API',
            version: '0.0.1'
        },
        components: {
            securitySchemes:{
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            } 
        },
        security: [{bearerAuth: []}]
    },
    apis: ['routes/*.js']

};

const swaggerSpec = swaggerJSDoc(options)


export const swagerDocs = (app)=>{
    app.use('/api/doc', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}