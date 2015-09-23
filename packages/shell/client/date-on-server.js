Meteor.startup(function(){
    Meteor.call('getDateOnServer', function(date){
        Session.set('dateOnServer', date);
    });
});
