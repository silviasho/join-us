
const queryes = {
    findUserTag: name=> `SELECT * FROM join_us.users WHERE user_name LIKE '%${name}%';`
}
module.exports = queryes


