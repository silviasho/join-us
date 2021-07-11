const pool = require('../db');
const queryes = require('./querys');


const searchUsers = async (inputResault) => {
    try {
        const { inputValue } = inputResault
        console.log(inputValue)
        const [users] = await pool.execute(queryes.findUserTag(inputValue));
        // console.log(users, "res from search user function")
        return users;
    } catch (error) {
        console.log(error)
        return error
    }
};

module.exports = { searchUsers };