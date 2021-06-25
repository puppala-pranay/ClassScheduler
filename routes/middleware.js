const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';

const withAuth = function(req, res, next) {
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    res.status(401).send(unauthorised);
    console.log("unauthorised");
  } else {
    jwt.verify(token, secret, function(err, decoded) {
      console.log(decoded);
      if (err) {
        res.status(401).send("unauthorised");
      } else {
        req.username = decoded.username;
        req.teacher_id = decoded.teacher_id;
        next();
      }
    });
  }
}

module.exports = withAuth;