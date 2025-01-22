const {Router} =require("express");
const adminRouter = Router();


adminRouter.post('/signup', function(req, res){
    res.json({
        message : "Signed Up Successfully"
    })
});

adminRouter.post('/signin', function(req, res){  
    res.json({
        message : "Signed In Successfully"
    })

});

adminRouter.post('/course', function(req, res){  
    res.json({
        message : "Signed In Successfully"
    })

});


adminRouter.put('/course', function(req, res){  
    res.json({
        message : "Signed In Successfully"
    })

});


adminRouter.get('/course', function(req, res){  
    res.json({
        message : "Signed In Successfully"
    })

});

module.exports ={
    adminRouter : adminRouter
}