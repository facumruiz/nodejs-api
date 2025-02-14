import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'Documentación de la API',
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 3000}`,
                description: 'Servidor de desarrollo (Local)',
            },
            {
                url: `https://full-api-n6zo.onrender.com/`,
                description: 'Servidor de desarrollo (Producción)',
            },
        ],
        tags: [

            {
                name: 'Login & Auth',
                description: 'Operaciones para autenticar usuarios mediante credenciales y generar tokens JWT.',
            },
            {
                name: 'Password Recovery',
                description: 'Operaciones para solicitar la recuperación de la contraseña.',
            },
            {
                name: 'User Management',
                description: 'Operaciones para gestionar usuarios',
            },
            {
                name: 'Record',
                description: 'Operaciones relacionadas con registros',
            },
        ],
        components: {
            schemas: {
                Record: {
                    type: 'object',
                    properties: {
                        name: {
                            type: 'string',
                            description: 'Nombre del registro',
                        },
                        position: {
                            type: 'string',
                            description: 'Posición del registro',
                        },
                        level: {
                            type: 'string',
                            enum: ['Junior', 'Mid', 'Senior'],
                            description: 'Nivel del registro',
                        },
                    },
                    required: ['name', 'position', 'level'],
                },
                User: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'Nombre del usuario',
                        },
                        email: {
                            type: 'string',
                            description: 'Correo electrónico del usuario',
                        },
                        password: {
                            type: 'string',
                            description: 'Contraseña del usuario',
                        },
                    },
                    required: ['name', 'email', 'password'],
                },
            },
        },
    },
    apis: [
        './routes/recordRoutes.js',
        './routes/userRoutes.js',
    ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
