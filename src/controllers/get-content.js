const inputValidator = require("../helpers/input-validator");

const processRequest = (request, response) => {
  const requestParams = request && request.params;
  return inputValidator
    .validateGetContent(requestParams)
    .then(() => {
      // Fetch DB based on contentID
      // Send details
    })
    .catch(error => {
      console.log(
        `error occurred while processing the get content request: ${JSON.stringify(
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
