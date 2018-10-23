const chai = require("chai");
const expect = chai.expect;
const inputValidator = require("../../src/helpers/input-validator");

describe("inputValidator", () => {
  describe("invalid inputs", () => {
    it("missing userId", () => {
      const input = {
        contentId: 12345,
        rating: 4
      };
      return inputValidator.validateAddContent(input).catch(err => {
        expect(err).to.eql({
          validationError: [
            {
              parameter: "userId",
              message: "Required value.",
              value: undefined
            }
          ]
        });
      });
    });

    it("missing contentId", () => {
      const input = {
        userId: 12345,
        rating: 4
      };
      return inputValidator.validateAddContent(input).catch(err => {
        expect(err).to.eql({
          validationError: [
            {
              parameter: "contentId",
              message: "Required value.",
              value: undefined
            }
          ]
        });
      });
    });

    it("missing rating", () => {
      const input = {
        userId: 12345,
        contentId: 54321
      };
      return inputValidator.validateAddContent(input).catch(err => {
        expect(err).to.eql({
          validationError: [
            {
              parameter: "rating",
              message: "Required value.",
              value: undefined
            }
          ]
        });
      });
    });

    it("unexpected value and format", () => {
      const input = {
        id: 12345,
        contentId: 54321,
        rating: "4"
      };
      return inputValidator.validateAddContent(input).catch(err => {
        expect(err).to.eql({
          validationError: [
            {
              message: "Unexpected value.",
              parameter: "id",
              value: 12345
            },
            {
              message: "Required value.",
              parameter: "userId",
              value: undefined
            },
            {
              message: "Incorrect type. Expected number.",
              parameter: "rating",
              value: "4"
            }
          ]
        });
      });
    });

    it("missing contentId in getContent request", () => {
      const input = {};
      return inputValidator.validateGetContent(input).catch(err => {
        expect(err).to.eql({
          validationError: [
            {
              message: "Required value.",
              parameter: "contentId",
              value: undefined
            }
          ]
        });
      });
    });
  });

  describe("valid input", () => {
    it("add content details", () => {
      const input = {
        userId: 12345,
        contentId: 54321,
        rating: 4
      };
      return inputValidator.validateAddContent(input).then(data => {
        expect(data).to.eql("validation successful");
      });
    });

    it("get content details", () => {
      const input = {
        contentId: 54321
      };
      return inputValidator.validateGetContent(input).then(data => {
        expect(data).to.eql("validation successful");
      });
    });
  });
});
