const express = require("express")
const router = express.Router()
const{homePage, createUser, updateUser, getUser, userDelete, loginUser} = require("../Controllers/userController")
const authMiddleware = require("../Middleware/authMiddleware")
const validateMiddleware = require("../Middleware/validationMiddleware")



//Home Page
router.get("/",homePage)

//Get User
router.get("/user/:id",getUser)

//Create User - Register Route
router.post("/user",validateMiddleware, createUser)

//update User
router.put("/user/:id",authMiddleware,updateUser)

//Delete User
router.delete("/user/:id",userDelete)

//Login User
router.post("/login",loginUser)

router.get("/profile",authMiddleware,(req,res)=>{
    res.status(200).json({
        message:"Profile Route",
        user:req.user
    })
})


module.exports = router