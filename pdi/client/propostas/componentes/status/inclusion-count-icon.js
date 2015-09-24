Template.inclusionCountIcon.events({
    'click .indicador': function(event, template){
        var loggedInUser = Meteor.user();

        if (Roles.userIsInRole(loggedInUser, 'pdi-admin')) {
            var context = {};
            context.node = this.node;
            context.currentTab = "tabPropostasInclusao";

            Modal.show('propostasDlg', context);
        }
    }
});