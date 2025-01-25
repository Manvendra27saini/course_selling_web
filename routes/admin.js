const {Router} =require("express");
const bcrypt = require('bcryptjs');
const adminRouter = Router();
const { adminModel, courseModel} = require("../db");
const jwt = require("jsonwebtoken");
const  {JWT_ADMIN_PASSWORD} = require("../config");
const {adminMiddleware} = require("../middleware/admin");



adminRouter.post('/course/signup',async function(req, res){
    try {
        const { email, password, firstName, lastName } = req.body;
        // Check if user already exists
        const existingUser = await adminModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Hash password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await adminModel.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.status(201).json({
            message: 'Signed up successfully',
            user: { email: newUser.email, firstName: newUser.firstName, lastName: newUser.lastName }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing up user' });
    }
});

adminRouter.post('/course/signin', async function(req, res){ 
    try {
        const { email, password } = req.body;

        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ message: 'admin not found' });
        }

        // Compare password with hashed password in the database
        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ 
            adminId: admin._id, 
            email: admin.email 
        }, process.env.JWT_ADMIN_PASSWORD, );

        res.json({
            message: 'Signed in successfully',
            token: token
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error signing in' });
    }
});

adminRouter.post('/course' , adminMiddleware, async function(req, res){  
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


adminRouter.put('/course' ,adminMiddleware ,async function(req, res){  
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