const express = require('express')
const fileUpload = require("express-fileupload")
const pics = express()
const randomKey = require('../utils/random')
const jwt = require('jsonwebtoken');
const { ifUerNameExistInDataBase } = require('../utils/findUser')
const pool = require('../db');
const queryes = require('../utils/querys');

pics.use(fileUpload())

pics.use(async (req, res, next) => {
    try {
        const { authorization } = req.headers;
        const userFromToken = await jwt.verify(authorization, process.env.SECRET, (err, decoded) => {
            return decoded;
        });
        const userFromDB = await ifUerNameExistInDataBase(userFromToken.userName);
        req.user = userFromDB
        next();
    } catch (error) {
        res.json({ err: 'somthing went wrong try to login again' });
    }
});

pics.post('/upload', async (req, res, next) => {
    try {
        const { user } = req
        const file = req.files.file
        const random = await randomKey(file.name)
        file.mv(`${__dirname}/../../picture-server/Pictures/${random}`, err => { if (err) throw new Error() })
        const [ifUserHaveProfilePicture]=await pool.execute(queryes.ifUserHaveProfilePicture,[user.userId])
        if(ifUserHaveProfilePicture.length===0){
            await pool.execute(queryes.insertUserProfilePictur,[random,user.userId])
        }else {
            await pool.execute(queryes.updateUserProfilePictur,[random,user.userId])
           
        }
        res.status(200)


        // 
        // await pool.execute(queryes.updateUserProfilePictur, [random, user.userId]);
        // res.json({ fileName: random }).status(200)

    } catch (err) {
        return res.json({ message: "image not saved " }).status(400)
    }
})

pics.get('/userProfileFileName', async (req, res, next) => {
    try {
        const { user } = req
      const [userProfileFileName]=  await pool.execute(queryes.findUserProfileFileName, [ user.userId]);
      const [selectedFile]=userProfileFileName
      res.json(selectedFile.file_name)

    } catch (err) {
        return res.json({ message: "image not saved " }).status(400)
    }
})



module.exports = pics