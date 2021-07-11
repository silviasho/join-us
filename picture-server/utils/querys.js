const queryes = {
    fineUserPicturesByUserId: 'SELECT file_name FROM join_us.pictures where user_id=?;',
    fineUserByUserName: 'SELECT * FROM join_us.users where user_name=? ;',
    

}
module.exports = queryes