var express = require('express');
const { response } = require('../app');
var router = express.Router();
const adminHelpers = require("../helpers/admin_helper")
const userHelpers = require("../helpers/user_helper");
/* GET users listing. */

router.get('/delete_user/:id', (req,res)=>{
  let userId= req.params.id
  adminHelpers.deleteUser(userId).then((response)=>{
    delete req.session.userDetails[response.id]
    res.redirect('/')
  })
 
})
router.post('/add_user',(req,res)=>{
  console.log(req.body);
  userHelpers.doSignup(req.body).then((response) => {
    console.log(response);
    res.redirect('/')
  });
})
router.get('/add_users',(req,res)=>{
  

res.render('admin/add_user',{admin:true})
})

router.get('/edit_users/:id',(req,res)=>{
  let userId = req.params.id
  adminHelpers.getUser(userId).then((user)=>{
    
        res.render("admin/edit_user",{admin:true,user});
      })

  
  })
  router.post('/update_users',(req,res)=>{
    let userId = req.params.id
    adminHelpers.userUpdate(req.body).then((response) => {
      // console.log(response);
      res.redirect("/");
    });
  
    
    })



module.exports = router;
