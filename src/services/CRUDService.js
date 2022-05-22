import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
    return new Promise(async (resole, reject) => {
        try {
            let hashPasswordFromBcrypt = await hashUserPassword(data.password);
            await db.User.create({
                fullname: data.fullname,
                email: data.email,
                password: hashPasswordFromBcrypt,
                address: data.address,
                gender: data.gender === '1' ? true : false,
                level: data.level
            })
            resole()
        } catch (e) {
            reject(e);
        }
    })
}

let hashUserPassword = (password) => {
    return new Promise(async (resole, reject) => {
        try {
            let hashPassword = await bcrypt.hashSync(password, salt);
            resole(hashPassword);
        } catch (e) {
            reject(e);
        }

    })
}

module.exports = {
    createNewUser: createNewUser
}