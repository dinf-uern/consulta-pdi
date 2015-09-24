Meteor.users.after.insert(function (userId, user) {
    var emails = ['pdi@uern.br'];

    //console.log(userId);

    if (emails.indexOf(user.emails[0].address) >= 0)
        Roles.setUserRoles(user._id, 'pdi-admin');
});