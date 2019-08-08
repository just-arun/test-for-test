# Requirement

- login auth for **HR**
- employe log **in/out**
- get all detaile
- get single person detail
- CUD for hr
- user leave log


## FOR API PART

| route      | method | router_parameters | items in body | description                 | output                                                                                                               | requires auth |
| ---------- | ------ | ----------------- | ------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------- |
| /api/logio/:uid | get    | uid               | -             | it's for user login and out | eihter one of the following output <br> you are logedin, you are logedout,user not found, you already logedout mate | -             |
| /api/create | post | - | name, email, role | to create a user | check for all the field and if any one of the field is null then response with status 404 and with the error message <br> is all it ments all the requirement then achnoledgement message will be sent | true |
| /api/getall | get | - | - | get all user | all user list | - |
| /api/get/:uid | get | uid | - | get one user | either 404 not found. or <br> user object | - |
| /api/edit/:uid | put | uid | name, email, role | edit user | either return validation error <br> or <br> status 200 | true |
| /api/delete/:uid | delete | uid | - | delete user useing his uid | either get status <br> 200 <br> or <br> 404 | true |
| /api/getdate | post | - | date | this date should be from html date picker | either form validation err msg or array of users | - |




## FOR Auth User PART

| route      | method | router_parameters | items in body | description                 | output                                                                                                               | requires auth |
| ---------- | ------ | ----------------- | ------------- | --------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------- |
| /user/regester | post | - |  name, uname, email, pwd, pwd2 | regester new user for admin purpose [**only HR has the access to this route**]() | either with you have no authorised, <br> validaion error or <br> status 200 | true |
| /user/login | post | - | username(which should be unique), <br> password | for admin login | either err with user not found or status 200 with user object | - |