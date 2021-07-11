const pool = require('../db');
const queryes = require('./querys');
const jwt = require('jsonwebtoken');


const ifUerNameExistInDataBase = async (userName) => {
    const [user] = await pool.execute(queryes.fineUserByUserName, [userName]);
    const [result] = user;
    return result;
};

const userFileName = async (token) => {
    const userFromToken = await jwt.verify(token, process.env.SECRET, (err, decoded) => {
        return decoded;
    });
    const user = await ifUerNameExistInDataBase(userFromToken.userName)
    const [res] = await pool.execute(queryes.fineUserPicturesByUserId, [user.userId]);
    const [fileName] = res
    return fileName.file_name

};

const userFileNameById = async (userId) => {
    const [res] = await pool.execute(queryes.fineUserPicturesByUserId, [userId]);
    const [fileName] = res
    return fileName.file_name

};

module.exports = { userFileName,userFileNameById };