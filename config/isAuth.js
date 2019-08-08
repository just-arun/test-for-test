const jwt = require("jsonwebtoken");
const auth1 = (req,res,next) => {
    // return (req.isAuthenticated()) ? next() : res.status(401).send({err:"Oii don't be cheeky let HR do these work"});
    console.log(req.headers);
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        // req.token = bearer[1];
        // next();
        jwt.verify(bearer[1],"mydamnsecret",(err,user)=>{
            if (err) {
                res.status(403).send({err:"you have no access for this mate"})
            } else {
                if (user.user.level > 0) {
                    next();
                } else {
                    res.status(401).send({err:"you are not auth mate"});
                }
            }
        });
    } else {
        res.status(401).send({err:"you are not auth mate"});
    }
}
const auth2 = (req,res,next) => {
    // return (req.isAuthenticated()) ? next() : res.status(401).send({err:"Oii don't be cheeky let HR do these work"});
    console.log(req.headers);
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        // req.token = bearer[1];
        // next();
        jwt.verify(bearer[1],"mydamnsecret",(err,user)=>{
            if (err) {
                res.status(403).send({err:"you have no access for this mate"})
            } else {
                if (user.user.level > 1) {
                    next();
                } else {
                    res.status(401).send({err:"you are not auth mate"});
                }
            }
        });
    } else {
        res.status(401).send({err:"you are not auth mate"});
    }
}


module.exports = {
    auth1,
    auth2
};