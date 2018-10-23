const inputValidator = require("../helpers/input-validator");

const processRequest = (request, response) => {
  const requestBody = request && request.body;
  return inputValidator
    .validateAddContent(requestBody)
    .then(() => {
      // Persist the details in DB
      // Send ack
    })
    .catch(error => {
      console.log(
        `error occurred while processing the add content request: ${JSON.stringify(
          error
        )}`
      );
      if (error.validationError) {
        return response.status(422).send(error);
      }
      return response.status(500).send({
        code: 500,
        message: "Unexpected error, Please report an incident"
      });
    });
};

module.exports = {
  processRequest
};
