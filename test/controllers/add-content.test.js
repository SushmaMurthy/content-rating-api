const chai = require("chai");
const expect = chai.expect;
const sinon = require("sinon");
const mockery = require("mockery");
chai.should();

describe("Add content details", () => {
  let addContentController;

  const req = {
    body: {
      userId: 12345,
      contentId: 54321,
      rating: 4
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
    addContentController = require("../../src/controllers/add-content");
    req.body.junk = "someValue";
    return addContentController
      .processRequest(req, validationRes)
  });
});
