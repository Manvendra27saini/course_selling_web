const {Router} =require("express");
const adminRouter = Router();
const { adminModel, courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const  {JWT_ADMIN_PASSWPRD} = require("../config");
const {adminMiddleware} = require("../middleware/admin");



adminRouter.post('/course/signup',async function(req, res){
    
    const { email, password, firstName, lastName } = req.body;
    await adminModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })
    res.json({
        message : "Signed Up Successfully"
    })
});

adminRouter.post('/course/signin', async function(req, res){ 
    const { email, password} = req.body;
    const admin = await adminModel.findOne({
        email,
        password
    });
    
    if(admin){
        const token = jwt.sign({
            id:admin._id,
        },JWT_ADMIN_PASSWORD);

        res.json({
            token: token
        })
    }else{
        res.status(403).json({
            message: "Invalid Credentials"
        })  
    }
});

adminRouter.post('/course' , async function(req, res){  
    const adminId =req.userId;
    const {title ,description ,price,imageUrl} =req.body;
    const course = await courseModel.create({
        title: title, 
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })
    res.json({
        message: "Course created",
        courseId: course._id
    })

});


adminRouter.put('/course'  ,async function(req, res){  
    const adminId =req.userId;
    const {courseId ,title, description, price ,imageUrl} =req.body;

    const course =await courseModel.findOne({
        _id : courseId,
        creatorId: adminId
    },{
        title:title,
        description:description,
        imageUrl:imageUrl,
        price:price
    })
    res.json({
        message:"Course Updated",
        courseId:course.id
    })


});

adminRouter.get('/course/bulk', adminMiddleware, async function(req, res) {  
    const adminId = req.userId;

    const courses = await courseModel.find({
        creatorId: adminId
    });
    res.json({
        message: "these are all courses",
        courses
    });
});

module.exports ={
    adminRouter : adminRouter
}