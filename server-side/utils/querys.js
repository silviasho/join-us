const queryes = {
    saveUser: 'INSERT INTO join_us.users (`full_name`, `user_name`, `birth_date`, `password`) VALUES (?,?,?,?);',
    addEvent: 'INSERT INTO `join_us`.`events` (`event_name`, `description`, `location`, `date_of_Event`, `categories`, `img`, `tag_people`) VALUES (?,?,?,?,?,?,?);',
    fineUserByUserName: 'SELECT * FROM join_us.users where user_name=? ;',
    insertUserProfilePictur: 'INSERT INTO `join_us`.`pictures` (`file_name`, `user_id`) VALUES (?,?);',
    updateUserProfilePictur:'UPDATE `join_us`.`pictures` SET `file_name` = ? WHERE (user_id = ?); ',
    getUserProfilePictur: 'SELECT * FROM join_us.pictures where user_id=?;',
    fineUserByUserNameAndPassword: "SELECT * FROM join_us.users where user_name=? and password=?;",
    findUserByUserId: "SELECT * FROM join_us.users where userId=?;",
    findUserTag: 'SELECT * FROM join_us.users WHERE user_name LIKE `%?%`;',
    findUsersDetails:`SELECT user_name,userId FROM join_us.users where userId = (?);`,
    findUserProfileFileName:'SELECT file_name FROM join_us.pictures where user_id=?',
    ifUserHaveProfilePicture:'SELECT id FROM join_us.pictures where user_id = ?'

}
module.exports = queryes

