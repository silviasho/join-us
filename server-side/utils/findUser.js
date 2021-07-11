const pool = require('../db');
const queryes = require('./querys');

const ifUerNameExistInDataBase = async (userName) => {
    try {
        const [user] = await pool.execute(queryes.fineUserByUserName, [userName]);

        const [result] = user;
        return result;
    } catch (error) {
       return error
    }

};
const findUserByUserId = async (userId) => {
    try {
        const [user] = await pool.execute(queryes.findUserByUserId, [userId]);

        const [result] = user;
        return result;
    } catch (error) {
       return error
    }

};
const checkIfUserNameAndPasswordMatch = async (userName, passwprd) => {
    const [user] = await pool.execute(queryes.fineUserByUserNameAndPassword, [userName, passwprd]);
    const [result] = user;

    return result;
};

module.exports = { ifUerNameExistInDataBase, checkIfUserNameAndPasswordMatch ,findUserByUserId};