var db = require("../config/connection");
var collection = require("../config/collections");
const bcrypt = require('bcrypt')
module.exports = {
    doSignup:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            userData.password=await bcrypt.hash(userData.password,10)
            db.get().collection(collection.USER_COLLECTION).insertOne(userData).then((data)=>{
                resolve(data.ops[0])
            })
        })
        
    },
    doLogin:(userData)=>{
        return new Promise(async (resolve,reject)=>{
            let loginStatus=false
            let response={}
            let user=await db.get().collection(collection.USER_COLLECTION).findOne({username:userData.username})
            if(user){
                bcrypt.compare(userData.password,user.password).then((status)=>{
                    if(status){
                        console.log('login success')
                        response.user=user
                        response.status=true
                        resolve(response)
                    }else{
                        console.log('login filed');
                        resolve({status:false})
                    }
                })
            }else{
                console.log('Login Filed');
                resolve({status:false})
            }
        })
    },
    getUsers:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            
            let authUser = userData.username
            
            let user=await db.get().collection(collection.USER_COLLECTION).find({username:authUser}).toArray()
            resolve(user)
        })
    },
    userUpdate:(userData)=>{
        return new Promise (async(resolve,reject)=>{
           
            console.log(userData);
            db.get().collection(collection.USER_COLLECTION).updateOne({username:userData.username},{$set:{
                username:userData.username,
                email:userData.email,
                first_name:userData.first_name,
                last_name:userData.last_name,
                address:userData.address,
                city:userData.city,
                country:userData.country,
                zip_code:userData.zip_code,
                about_me:userData.about_me
            }
        }).then((response)=>{
            resolve()
        })
        })
    }
};

