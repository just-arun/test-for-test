// // const assert = require("chai").assert;
// // const should = chai.should();


// const expect = require("chai").expect;
// const request = require("request");
// const server = "http://localhost:3000";



// describe("deep testing app",()=>{
//     // just test test
//     describe("testing root file",()=>{
//         it("should return Ooi mate,statusCode 200",(done)=>{
//             request.get(`${server}/`,(err,res,body)=>{
//                 expect(res.statusCode).to.equal(200);
//                 expect(body).to.equal("Ooi mate");
//                 done()
//             })
//         })
//     });
//     describe("API test",()=>{
//         describe("log in/out test",()=>{
//             describe("testing for error and returns true when their are error handelers",()=>{
//                 it("using wrong uid will return json \"err\":\"ooi just don\'t panic. take a deep breath enter you uid correctly\"",(done)=>{
//                     request(`${server}/api/logio/:id`,(err,res,body)=>{
//                         expect(res.body).to.equal('{"err":"ooi just don\'t panic. take a deep breath enter you uid correctly"}');
//                         done()
//                     });
//                 });
//                 it("using wrong pwd",(done)=>{
//                     request(`${server}/api/logio/:id`,(err,res,body)=>{
//                         expect(res.body).to.equal('{"err":"ooi just don\'t panic. take a deep breath enter you uid correctly"}');
//                         done()
//                     });
//                 });
//             });
//         });
//     });
// });