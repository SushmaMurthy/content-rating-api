const nodeValidator = require("node-validator");

function validateAddContent(input) {
  const validatorConfig = nodeValidator
    .isObject()
    .withRequired(
      "userId",
      nodeValidator.isNumber({
        message: "userId provided is in an invalid format, Expecting number"
      })
    )
    .withRequired(
      "contentId",
      nodeValidator.isNumber({
        message: "contentId provided is in an invalid format, Expecting number"
      })
    )
    .withRequired(
      "rating",
      nodeValidator.isNumber({
        message: "rating provided is in an invalid format, Expecting number"
      })
    );

  let errors = undefined;
  nodeValidator.run(validatorConfig, input, (count, validationError) => {
    if (validationError && validationError.length > 0) {
      errors = {
        validationError
      };
    }
  });
  if (errors) {
    return Promise.reject(errors);
  }
  return Promise.resolve("validation successful");
}

function validateGetContent(input) {
  const validatorConfig = nodeValidator.isObject().withRequired(
    "contentId",
    nodeValidator.isNumber({
      message: "contentId provided is in an invalid format, Expecting number"
    })
  );

  let errors = undefined;
  nodeValidator.run(validatorConfig, input, (count, validationError) => {
    if (validationError && validationError.length > 0) {
      errors = {
        validationError
      };
    }
  });
  if (errors) {
    return Promise.reject(errors);
  }
  return Promise.resolve("validation successful");
}

module.exports = {
  validateAddContent,
  validateGetContent
};
