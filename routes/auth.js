const router = require("express").Router();
const AuthUser = require("./../models/auth");
const bcrypt = require('bcryptjs');
const isAuth = require("./../config/isAuth");
const jwt = require("jsonwebtoken");
const upload = require("./../util/imageUP");
// var multer  = require('multer')
// var uploads = multer()

router.post("/regester",isAuth.auth2,upload, async (req, res) => {
  const { name, uname, email, pwd, pwd2, level } = req.body;
  console.log(req.body);

  try {
    // upload(req,res,(err)=>{
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log(req.file);
    //     var fn = req.file.path.replace("public/","/");
    //     console.log(fn);
    //   }
    // });
    if (name == null) {
      res.status(404).send({ err: "name is required" });
    } else if (uname == null) {
      res.status(404).send({ err: "uname is required" });
    } else if (email == null) {
      res.status(404).send({ err: "email is required" });
    } else if (pwd == null) {
      res.status(404).send({ err: "pwd is required" });
    } else if (pwd !== pwd2) {
      res.status(404).send({ err: "password dosent match" });
    } else if (level == null) {
      res.status(404).send({ err: "level is required mate!!!" });
    } else {
      const userCheck = await AuthUser.find({ email: email,uname: uname });
      if (userCheck.length > 0) {
        res.status(404).send({ err: "user already exist" });
      } else {
        bcrypt.genSalt(10, function(err, salt) {
            if (err) throw err;
            bcrypt.hash(pwd, salt, function(err, hash) {
              if (err) throw err;
              upload(req, res, (erro) => {
                if(err) {
                  console.log(erro);
                } else {
                  console.log(req.file);
                  
                  var newUser = new AuthUser();
                  newUser.name = name;
                  newUser.uname = uname;
                  newUser.email = email;
                  newUser.pwd = hash;
                  newUser.level = level;
                  newUser.image = req.file.path.replace("public/","/");
                  console.log(newUser);
                  newUser.save();
                  res.send({ msg: "user added" });
                }
              });
            });
        });
      }
    }
  } catch (err) {
    console.log(err);
  }
});



router.post("/login",async (req,res) => {
  const { uname, pwd } = req.body;
  try {
    if (uname == null || pwd == null) {
      res.send({err:"ooi just just fillin the field correctly mate"})
    } else {
      const user = await AuthUser.findOne({uname});
      console.log(user);
      if (user !== null) {
        bcrypt.compare(pwd,user.pwd,async (err,isUser) => {
          if (err){
            console.log(err);
            } else {
            if (!isUser) {
              res.send({err:"Ooi enter your correct password mate"});
            } else {
              const suser = await AuthUser.findOne({uname}).select("-pwd");
              jwt.sign({suser},"mydamnsecret",(err,token)=>{
                if (err) {
                  res.send({err});
                } else {
                  res.send({msg:"you are loged in mate",user:suser,token});
                }
              });
            }
          }
        });
      } else {
        res.status(404).send({err:"their is no user mate"});
      }
    }
  } catch (err) {
    console.log(err);
  }
});





router.post("/logout",(req,res)=>{
  req.logOut();
  res.redirect("/api");
});

module.exports = router;