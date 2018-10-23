const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const mockery = require("mockery");
chai.should();

describe("Get content details", () => {
  let getContentController;

  const req = {
    params: {
      contentId: 54321
    }
  };

  const validationRes = {
    status: code => {
      expect(code).to.eql(422);
      return {
        send: () => sinon.stub()
      };
    },
    send: () => {}
  };

  const stubValidationErrResponse = () => {
    const errors = ["property"];
    const stubValidate = {
      validate: () => {
        return errors;
      }
    };
    mockery.registerMock("./helpers/input-validator", stubValidate);
  };

  before(() => {
    mockery.enable({
      warnOnUnregistered: false,
      useCleanCache: true
    });
  });

  afterEach(() => {
    mockery.deregisterAll();
    mockery.resetCache();
  });

  after(() => {
    mockery.disable();
  });

  it("processRequest with validation error", () => {
    stubValidationErrResponse();
    getContentController = require("../../src/controllers/get-content");
    req.params.contentId = "someValue";
    return getContentController.processRequest(req, validationRes);
  });
});
