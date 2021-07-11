const express = require('express')
const registration = express()
const pool = require('../db')
const queryes = require('../utils/querys')
const getJwt = require('../utils/jwt');
const { ifUerNameExistInDataBase, checkIfUserNameAndPasswordMatch, findUserByUserId } = require('../utils/findUser');
const { compare } = require('bcryptjs');


registration.get('/userDetails/:userId', async (req, res, next) => {
    try {
        const { userId } = req.params
        const userDetails = await findUserByUserId(userId)
        res.json(userDetails)
    } catch (error) {
        return res.json({ err: "check your details" }).status(400)
    }
})

registration.use(async (req, res, next) => {
    try {
        const { userName } = req.body;
        const user = await ifUerNameExistInDataBase(userName);
        req.user = user;
        next();
    } catch (error) {
        res.json({ err: "somthing went wrong" }).status(400)
    }
});

registration.post('/login', async (req, res, next) => {
    try {
        const { userName, password } = req.body
        const { user } = req
        if (!user) throw new Error();
        const { fullName, birthDate } = user
        const validUser = await checkIfUserNameAndPasswordMatch(userName, password)
        if (!validUser) throw new error
        else {
            const userToken = await getJwt({ fullName, userName, birthDate, password });
            return res.status(200).json({ token: userToken, user: validUser })
        }
    } catch (error) {
        return res.json({ err: "check your details" }).status(400)
    }
})


registration.post('/saveUser', async (req, res, next) => {
    try {
        const { user } = req
        if (user) {
            return res.json({ err: "user name exist, chose difrent user name" }).status(500)
        }
        const { fullName, userName, birthDate, password } = req.body
        await pool.execute(queryes.saveUser, [fullName, userName, birthDate,password])
        const userToken = await getJwt({ fullName, userName, birthDate, password });
        const userId = await ifUerNameExistInDataBase(userName)
        return res.json({ token: userToken, user: { userName: userName, userId: userId.userId, password: userId.password } }).status(200)
    } catch (err) {
        return res.json({ err: "user not saved " }).status(400)
    }
})

module.exports = registration