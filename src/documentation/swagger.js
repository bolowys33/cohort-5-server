const swaggerJsDoc = require("swagger-jsdoc");
const path = require("path");

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "API documentation for the User Management System",
    },
  },
  apis: [path.join(__dirname, "../routes/*.js")],
});

module.exports = swaggerSpec;
