var express = require("express");
// const { response } = require("../app");

var router = express.Router();
const userHelpers = require("../helpers/user_helper");
const adminHelpers = require("../helpers/admin_helper")
const adminLoginVerify=(req,res,next)=>{
if(req.session.user){
  next()
}else{
  res.redirect("/")
}
}

/* GET home page. */
router.get("/", function (req, res, next) {
 
  var user = req.session.userDetails
  if (req.session.loggedIn) {
    let loggedUser = req.session.user.role
    if(loggedUser === "admin"){
      adminHelpers.getAllUsers().then((users)=>{
        console.log(users);
     
         res.render("admin/dashboard", { admin: true,users });
           })

    }else{
      res.render("user/dashboard",{user});
    }
    
  } else {
    res.header(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
    );
    res.render("index", { layout: false, loginErr: req.session.loginErr });
    req.session.loginErr = false;
  }
});


router.post("/signup", function (req, res) {
  userHelpers.doSignup(req.body).then((response) => {
    req.session.loggedIn = true;
    req.session.user = req.body.username;
    userHelpers.getUsers(req.body).then((user)=>{
      req.session.userDetails=user
          res.render("user/dashboard",{user});
        })
  });
});


router.post("/login", (req, res) => {
  userHelpers.doLogin(req.body).then((response) => {
    if (response.status) {
      req.session.loggedIn = true;
      req.session.user = response.user;
      console.log(req.session.user);
      if (response.user.role === "admin") {
        adminHelpers.getAllUsers().then((users)=>{
         req.session.userDetails=users
          res.render("admin/dashboard", { admin: true,users });
            })
        
      } else {
        userHelpers.getUsers(req.body).then((user)=>{
      req.session.userDetails=user
      // console.log(user);
          res.render("user/dashboard",{user});
        })
      }
    } else {
      req.session.loginErr = true;
      res.redirect("/");
    }
  });
});
router.post("/userupdate",(req,res)=>{

  req.session.userDetails[0] =req.body
  userHelpers.userUpdate(req.body).then((response) => {
    // console.log(response);
    res.redirect("/");
  });
})
router.get("/profile", function (req, res, next) {
  //  console.log(userDetailss)
  userHelpers.getUsers(req.session.userDetails[0]).then((user)=>{
    // console.log(user);
        res.render("user/profile",{user});
      })
});
router.get("/login", (req,res)=>{
  res.redirect("/")
});
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
