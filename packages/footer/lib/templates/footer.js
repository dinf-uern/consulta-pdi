Template.footer.helpers({
    ano: function(){
        var dateOnServer = Session.get('dateOnServer');
        return moment(dateOnServer).format('YYYY');
    },
    version: function(){
        return Footer.getVersion();
    }
});