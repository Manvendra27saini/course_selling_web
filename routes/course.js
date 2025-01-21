const { Router } = require("express");

const courseRouter = Router();
    courseRouter.post('/purchase', function(req, res){
        res.json({
            message : "You have purchased the course"
        })
    
    });
    
    courseRouter.get('/preview', function(req, res){
        res.json({
            message : "These are the all courses available"
        })
    
    });


    module.exports ={
        courseRouter : courseRouter
    }    
