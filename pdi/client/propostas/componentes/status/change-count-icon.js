Template.changeCountIcon.helpers({
    classBadgeSuccess: function(){
        return this.node.temPropostaAteracaoHomologada === true? 'badge-success':'';
    }
});

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