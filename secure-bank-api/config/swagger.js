const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Secure Bank API",
      version: "1.0.0",
      description: "API documentation for Secure Bank API (Node.js + Express + MongoDB)",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./routes/*.js"], // <-- scan your routes folder for @swagger comments
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;