const { Router } = require('express');

const userRouter = Router();

    userRouter.post('/signup', function(req, res){
        const userName = req.body("userName");
        const password = req.body("password");
        res.json({
            message : "Signed Up Successfully"
        })
    
    });
    
    
    userRouter.post('/signin', function(req, res){
        const userName = req.body("userName");
        const password = req.body("password");
        res.json({
            message : "Signed In Successfully"
        })
    
    });
    
    userRouter.get('/purchases', function(req, res){
        res.json({
            message : "These are the courses you have purchased"
        })
    
    });
    
 

module.exports ={
    userRouter : userRouter
}