const { Router } = require("express");
const {userMiddleware} = require("../middleware/user");
const { purchaseModel, courseModel } = require("../db");
const courseRouter = Router();


    courseRouter.post('/purchase',userMiddleware, async function(req, res){
        const userId = req.userId;
        const courseId = req.body.courseId;
        const course =await purchaseModel.create({
            courseId: courseId,
            userId: userId
        })
        res.json({
            message : "You successfully purchased the course",
        })
    
    });
    
    courseRouter.get('/preview', async  function(req, res){
        const courses = await courseModel.find({});
        res.json({
            message : "These are the all courses available",
            courses
        })
    
    });


    module.exports ={
        courseRouter : courseRouter
    }    
