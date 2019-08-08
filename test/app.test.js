var expect = require("chai").expect;
var querystring = require("querystring");
const request = require("request");
const jsonschema = require("jsonschema");
const server = "http://localhost:3000";

describe("get user | logIO APP", function() {
  describe("get all users", function() {
    it("should get all users", function(done) {
      request.get(`${server}/api/getall`, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe("get one using uid", function() {
    it("should get one user", done => {
      request.get(`${server}/api/get/WKC3045`, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe("try to get one without using uid", function() {
    it("should get error messge", done => {
      request.get(`${server}/api/get/WKC5033`, (err, res, body) => {
        expect(res.statusCode).to.equal(404);
        expect(body).to.equal('{"err":"user not found"}');
        done();
      });
    });
  });
});

describe("edit user | logIO APP", function() {
  describe("edit users", function() {
    it("should get all users", function(done) {
      request.get(`${server}/api/get/WKC3045`, (err, res, body) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe("try to get one using uid wrong", function() {
    it("should get error message", done => {
      request.get(`${server}/api/get/WKC5033`, (err, res, body) => {
        expect(res.statusCode).to.equal(404);
        expect(body).to.equal('{"err":"user not found"}');
        done();
      });
    });
  });
});

describe("delete user | logIO APP", function() {
  describe("deleting user without using auth key", function() {
    it("it should return 401 status code", done => {
      request.delete(`${server}/api/delete/WKCsd41`, (err, res, body) => {
        expect(res.statusCode).to.equal(401);
        expect(body).to.equal('{"err":"you are not auth mate"}');
        done();
      });
    });
  });
  describe("deleting user with using auth key but without correct uid", function() {
    it("it should return 404 status code", done => {
      request.delete(
        {
          authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkMTM2Mjg0YzRmNjUzNmI4ZGNlNjFhZiIsIm5hbWUiOiJtciBhbnQiLCJ1bmFtZSI6ImNyYXp5IGtpZCIsImVtYWlsIjoiYW50QGFudG1haWwuY29tIiwicHdkIjoiJDJhJDEwJHZzWFg3WkJ2T2dVbXVmR3dtNEIvbU9kajQvTFRXRXhHS21vbHRYaEVUbGR6ZVV6OWJIajZHIiwiX192IjowLCJsZXZlbCI6Mn0sImlhdCI6MTU2MTcyMjAzNn0.R78IQ4__B1HHbxacnwZH7ht04dDDqlpw_6nClsdyfIs",
          url: `${server}/api/delete/WKCsd41`
        },
        (err, res, body) => {
          expect(res.statusCode).to.equal(401);
          expect(body).to.equal('{"err":"you are not auth mate"}');
          done();
        }
      );
    });
  });
});

describe("get by date | logIO", function() {
  describe("get user between specefied date and time", () => {
    it("trying without specefing date will return empty array", done => {
      request.post(
        {
          url: `${server}/api/getdate`
        },
        (err, res, body) => {
          expect(res.statusCode).to.equal(200);
          done();
        }
      );
    });
  });
  describe("get user between specefied date and time", () => {
    it("trying with specefing date", done => {
      var form = {
        date1: "2019-06-28T12:46:47.263Z",
        date2: "2019-06-28T12:46:49.842Z"
      };
      var formData = querystring.stringify(form);
      var contentLength = formData.length;
      request.post(
        {
          headers: {
            "Content-Length": contentLength,
            "content-type": "application/json"
          },
          url: `${server}/api/getdate`,
          body: formData
        },
        (err, res, body) => {
          expect(res.statusCode).to.equal(400);
          done();
        }
      );
    });
  });
});

describe("now it's time to check | logIO APP", () => {
  describe("regester user without auth", () => {
    it("try to regester without auth token expect 401 status code", done => {
      request.post(
        {
          url: `${server}/user/regester`
        },
        (err, res, body) => {
          expect(res.statusCode).to.equal(401);
          done();
        }
      );
    });
  });
  describe("regester user with auth", () => {
    it("try to regester with auth token but with lower level admin and without required criterias expect 403 status code", done => {
      request.post(
        {
          headers: {
            authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVkMTM2Mjg0YzRmNjUzNmI4ZGNlNjFhZiIsIm5hbWUiOiJtciBhbnQiLCJ1bmFtZSI6ImNyYXp5IGtpZCIsImVtYWlsIjoiYW50QGFudG1haWwuY29tIiwicHdkIjoiJDJhJDEwJHZzWFg3WkJ2T2dVbXVmR3dtNEIvbU9kajQvTFRXRXhHS21vbHRYaEVUbGR6ZVV6OWJIajZHIiwiX192IjowLCJsZXZlbCI6Mn0sImlhdCI6MTU2MTcyMjAzNn0.R78IQ4__B1HHbxacnwZH7ht04dDDqlpw_6nClsdyfIs"
          },
          url: `${server}/user/regester`
        },
        (err, res, body) => {
          expect(res.statusCode).to.equal(403);
          done();
        }
      );
    });
  });
  describe("regester user with auth", () => {
    var form = {
      uname: "crazy kid"
    };
    var formData = querystring.stringify(form);
    var contentLength = formData.length;
    it("try to regester with auth token but with lower level admin and without required criterias expect 400 status code", done => {
      request.post(
        {
          headers: {
            "Content-Length": contentLength,
            "content-type": "application/json"
          },
          url: `${server}/user/logio`,
          body: formData
        },
        (err, res, body) => {
          expect(res.statusCode).to.equal(400);
          done();
        }
      );
    });
  });
  describe("regester user with auth", () => {
    var form = {
      uname: "crazy kid",
      pwd: "pwd"
    };
    var formData = querystring.stringify(form);
    var contentLength = formData.length;
    it("try to regester with auth token but with lower level admin and without required criterias expect 400 status code", done => {
      request.post(
        {
          headers: {
            "Content-Length": contentLength,
            "content-type": "application/json"
          },
          url: `${server}/user/logio`,
          body: formData
        },
        (err, res, body) => {
          expect(res.statusCode).to.equal(400);
          done();
        }
      );
    });
  });
});

const chai = require("chai");
chai.use(require("chai-json-schema"));

var ObjectId = require("mongodb").ObjectID;
var Mid = new ObjectId();

// var schema = {
//     "_id": id,
//     "name": {"type": "string"},
//     // "type": "object",
//     "email":{"type": "string"},
//     "uid":{"type": "string"},
//     "date": Date,
//     "role":"string",
//     "logs":Array
// };

var userSchema = {
  title: "user schema v1",
  type: "object",
  required: [
    "logs",
    "_id",
    "name",
    "email",
    "uid",
    "date",
    "role",
    "leaves",
    "__v"
  ],
  properties: {
    logs: {
      type: "array"
    },
    _id: {
      type: 'string'
    },
    name: {
      type: "string"
    },
    email: {
      type: "string"
    },
    uid: {
      type: "string"
    },
    date: {
      type: "string"
    },
    role: {
      type: "string"
    },
    leaves: {
      type: "number"
    },
    __v: {
      type: "number"
    }
  }
};

var goodApple = {
  logs: [{ date: null, inTime: null, outTime: null }],
  _id: "5d1474c2e695f1410637c431",
  name: "small kid",
  email: "kid@man.com",
  uid: "WKC3045",
  date: "null",
  role: "back dev",
  leaves: 0,
  __v: 0
};
var badApple = {
  colors: ["brown"],
  taste: 0,
  worms: 2
};
var fruitSchema = {
  title: "fresh fruit schema v1",
  type: "object",
  required: ["skin", "colors", "taste"],
  properties: {
    colors: {
      type: "array",
      minItems: 1,
      uniqueItems: true,
      items: {
        type: "string"
      }
    },
    skin: {
      type: "string"
    },
    taste: {
      type: "number",
      minimum: 5
    }
  }
};

describe("testing for structure of an json object", () => {
  describe("testing to get one user", () => {
    it("testing with schema", done => {
      request(`${server}/api/get/WKC3045`, (err, res, body) => {
        if (err) {
          console.log(err);
        } else {
          expect(res.statusCode).to.be.equal(200);
          expect(goodApple).to.be.jsonSchema(userSchema);
          done();
        }
      });
    });
  });
});
