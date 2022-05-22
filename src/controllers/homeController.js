import db from '../models/index';
import CRUDService from "../services/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let data = await db.User.findAll();
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        });
    } catch (e) {
        console.log(e)
    }
}
//them
let getCRUD = (req, res) => {
    return res.render('crud.ejs');
}
let postCRUD = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);
    console.log(message);
    return res.send('post crud from server');
}

// hien thi
let displayGetCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    // console.log(data);
    return res.render('displayCRUD.ejs', {
        data: data,
    });
}

// sua
let getEditCRUD = async (req, res) => {
    let userId = req.query.id;
    if(userId){
        let userData = await CRUDService.getUserInfoById(userId);
        // console.log(userData)
        return res.render("editCRUD.ejs", {
            userData: userData,
        })
    }else{
        return res.send("Khong tim thay User")
    }

    return res.send("edit");
}

// update
let putCRUD = async (req, res) => {
    let data = req.body;
    let allUsers = await CRUDService.updateUserData(data);
    // return res.send("up done"); // sau khi update thi hien thi thong bao
    return res.render("displayCRUD.ejs", {
        data: allUsers,
    })
}

//object {key: '', value; ''}
module.exports = {
    getHomePage: getHomePage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    displayGetCRUD: displayGetCRUD,
    getEditCRUD: getEditCRUD,
    putCRUD: putCRUD,
}