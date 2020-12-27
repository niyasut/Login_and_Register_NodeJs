var db = require("../config/connection");
var collection = require("../config/collections");
var objectId = require('mongodb').ObjectId
module.exports={
    getAllUsers:()=>{
        return new Promise(async(resolve,reject)=>{
            
           
            
            let users=await db.get().collection(collection.USER_COLLECTION).find().toArray()
            resolve(users)
        })
    },
    deleteUser:(userId)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(collection.USER_COLLECTION).removeOne({_id:objectId(userId)}).then((response)=>{
                resolve(response)
            })
        })

    },
    getUser:(userData)=>{
        return new Promise(async(resolve,reject)=>{
            
            let userId = userData
            
            let user=await db.get().collection(collection.USER_COLLECTION).find({_id:objectId(userId)}).toArray()
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
    
}