var express = require('express');
var router = express.Router();
var db_services = require("../services/db");

const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';



router.post("/",(req,res)=>{
    var username = req.body.username;
    var pass = req.body.pass;

    var query_str = "SELECT * FROM `LoginDetails` WHERE username = ?";
    var params = [username];

    console.log(req.body);

    try{
        db_services.query(query_str,params)
        .then((results)=>{
            console.log(results);
            if(results.length>0 && results[0]["pass"] == pass){
                const payload = { username:username, teacher_id: results[0]["teacher_id"] };
                const token = jwt.sign(payload, secret, {
                expiresIn: '1h'
                });
                res.cookie('token', token, { httpOnly: true }).json({teacher_id: results[0]["teacher_id"],isAdmin:true});
            }else{
                res.status(500);
            }
        }).catch(e=>{
            console.log(e);
        });
    
}
catch(e){
    res.status(500).send("Internal server error");
    console.log("Internal server error");
}
})

module.exports = router;