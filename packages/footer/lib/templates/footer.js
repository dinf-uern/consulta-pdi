Template.footer.helpers({
    ano: function(){
        var dateOnServer = Session.get('dateOnServer');
        return moment(dateOnServer).format('YYYY');
    },
    textOnRight: function(){
        return Footer.getTextOnRight();
    }
});