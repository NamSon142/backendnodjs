import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

//them
// promise: ham xu li bat dong bo
let createNewUser = async (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            // let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                fullname: data.fullname,
                email: data.email,
                // password: hashPasswordFromBcrypt,
                password: data.password,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                level: data.level
            })
            resolve("create succeed")
        } catch (e) {
            reject(e);
        }
    })
}

// let hashUserPassword = (password) => {
//     return new Promise(async (resolve, reject) => {
//         try {
//             let hashPassword = await bcrypt.hashSync(password, salt);
//             resolve(hashPassword);
//         } catch (e) {
//             reject(e);
//         }

//     })
// }


// hien thi
let getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let users = db.User.findAll({
                raw: true, //array
            });
            resolve(users)
        } catch (e) {
            reject(e)
        }
    })
}

// sua
let getUserInfoById = (userId) => {
    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({
                where: {id: userId},
                raw: true,
            })
            if(user){
                resolve(user)
            }else{
                resolve({})
            }
        }catch(e){
            reject(e);
        }
    })
}

// cap nhat
let updateUserData = (data) => {
    // console.log("data from service");
    // console.log(data);

    return new Promise(async (resolve, reject) => {
        try{
            let user = await db.User.findOne({ // tim user trong db
                where: {id: data.id}
            })
            if(user){ //cap nhat
                user.fullname = data.fullname;
                user.email = data.email;
                user.password = data.password;
                user.address = data.address;
                user.gender = data.gender;
                user.level = data.level;

                await user.save(); // luu

                let allUsers = await db.User.findAll();
                resolve(allUsers);
            }else{
                resolve();
            }
            
        }catch(e){
            reject(e);
        }
    })
}

module.exports = {
    createNewUser: createNewUser,
    getAllUser: getAllUser,
    getUserInfoById: getUserInfoById,
    updateUserData: updateUserData
}