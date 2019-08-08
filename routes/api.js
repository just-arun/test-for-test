const router = require("express").Router();
const User = require("./../models/users");
const isAuth = require("./../config/isAuth");
const jwt = require("jsonwebtoken");

// employe logio
router.get("/logio/:id", async (req, res) => {
  const uid = req.params.id;
  const date = new Date();
  try {
    const user = await User.findOne({ uid: uid });
    if (user == null) {
      res
        .status(404)
        .send({
          err:
            "ooi just don't panic. take a deep breath enter you uid correctly"
        });
    } else {
      const usr = await User.findOne({ uid: uid });
      if (usr.date == null) {
        // login function
        var newuserlog = usr.logs;
        newuserlog.push({
          date: date,
          inTime: date,
          outTime: null
        });
        console.log(newuserlog);

        await User.updateMany(
          { uid: uid },
          {
            $set: {
              date: date,
              logs: newuserlog
            }
          }
        );
        res.send({ msg: "you are loged in mate" });
      } else if (user.date.getDate() !== date.getDate()) {
        // login function
        var newuserlog = usr.logs;
        newuserlog.push({
          date: date,
          inTime: date,
          outTime: null
        });
        console.log(newuserlog);
        await User.updateMany(
          { uid: uid },
          {
            $set: {
              date: date,
              logs: newuserlog
            }
          }
        );
        res.send({ msg: "you are loged in mate" });
      } else {
        // logout function
        if (usr.logs[usr.logs.length - 1].outTime == null) {
          var newuserlog = usr.logs;
          newuserlog[usr.logs.length - 1].outTime = date;
          console.log(newuserlog);
          await User.updateMany({ uid: uid }, { $set: { logs: newuserlog } });
          res.send({ msg: "you got loged out mate" });
        } else {
          res.status(401).send({ msg: "ooi you already loged out mate" });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// create one user
router.post("/create", async (req, res) => {
  const { name, email, role } = req.body;
  try {
    if (name == null) {
      res.status(404).send({ err: "name is required" });
    } else if (email == null) {
      res.status(404).send({ err: "email is required" });
    } else if (role == null) {
      res.status(404).send({ err: "role is required" });
    } else {
      const preUser = await User.findOne({ email: email });
      if (preUser !== null) {
        res.status(404).send({ err: "user already exist" });
      } else {
        const count = await User.countDocuments({});
        var uid = `WKC${Math.floor(Math.random() * 999)}${count + 1}`;
        var newUser = new User();
        newUser.name = name;
        newUser.email = email;
        newUser.uid = uid;
        newUser.date = null;
        newUser.role = role;
        newUser.leaves = 0;
        newUser.logs = [{ date: null, inTime: null, outTime: null }];
        newUser.save();
        res.send({ msg: "user added" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});



console.log("i'm alive mate");
// get all users
router.get("/getall", async (req, res) => {
  try {
    const users = await User.find({}).select("-logs");
    res.send(users);
  } catch (err) {
    console.log(err);
  }
});

// get one user by uid
router.get("/get/:id", async (req, res) => {
  try {
    const users = await User.findOne({ uid: req.params.id });
    if (users !== null) {
      res.send(users);
    } else {
      res.status(404).send({err: "user not found"});
    }
  } catch (err) {
    console.log(err);
  }
});

// edit one user by uid
router.put("/edit/:uid", isAuth.auth2, async (req, res) => {
  const { name, email, role } = req.body;
  const user = await User.findOne({uid: req.params.uid});
  try {
    if (name == null) {
      res.status(404).send({ err: "name is required" });
    } else if (email == null) {
      res.status(404).send({ err: "email is required" });
    } else if (role == null) {
      res.status(404).send({ err: "role is required" });
    } else {
      if (user == null) {
        res.status(404).send({ err: "user not found" });
      } else {
        var query = {
          $set: {
            name: name,
            email: email,
            role: role
          }
        };
        await User.update({ uid: req.params.uid }, query);
        res.send({ msg: "user updated" });
      }
    }
  } catch (err) {
    console.log(err);
  }
});

// delete one user by uid
router.delete("/delete/:id", isAuth.auth2, async (req, res) => {
  const id = req.params.id;
  try {
    const usr = await User.findOne({ uid: id });
    if (usr == null) {
      res.status(404).send({ msg: "user not found" });
    } else {
      await User.findOneAndDelete({ uid: id });
      res.send({ msg: "user deleted" });
    }
  } catch (err) {
    console.log(err);
  }
});

// get users for specefic date
router.post("/getdate", async (req, res) => {
  const date1 = new Date(req.body.date1);
  const date2 = new Date(req.body.date2);
  try {
    if (date1 !== null && date2 !== null) {
        const user = await User.find({
          "logs.date": {
            $gte: new Date(date1.toString()),
            $lte: new Date(date2.toString())
          }
        });
      res.send(user);
    } else if(date1 !== null && date2 == null){
        const user = await User.find({
          "logs.date": {
            $gte: new Date(date1.toString())
          }
        });
        res.send(user);
    } else {
      res.status(404).send({ err: "ooi the date field is empty mate" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;




// passport.use(new LocalStrategy(
//   function(username, password, done) {
//     User.findOne({ username: username }, function (err, user) {
//       if (err) { return done(err); }
//       if (!user) { return done(null, false); }
//       if (!user.verifyPassword(password)) { return done(null, false); }
//       return done(null, user);
//     });
//   }
// ));

// app.post('/login', 
//   passport.authenticate('local', { failureRedirect: '/login' }),
//   function(req, res) {
//     res.redirect('/');
//   });