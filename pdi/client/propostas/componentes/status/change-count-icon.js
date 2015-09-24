Template.changeCountIcon.events({
    'click .indicador': function(event, template){
        var loggedInUser = Meteor.user();

        if (Roles.userIsInRole(loggedInUser, 'pdi-admin')) {
            var context = {};
            context.node = this.node;
            context.currentTab = "tabPropostasAlteracao";

            Modal.show('propostasDlg', context);
        }
    }
});