Template.listarUsuarios.helpers({
    getEmail: function(){
        return this.emails[0].address;
    },
    rolesDesc: function(){
        var rolesDesc = [];

        if (this.roles && this.roles.length > 0)
            rolesDesc = this.roles.join(', ');

        return rolesDesc;
    }
});

Template.listarUsuarios.events({
    'click .btn-definir-papeis': function(){
        var userId = this._id;
        var papeisAtuais = [];

        if (Meteor.user().roles && Meteor.user().roles.length > 0)
            papeisAtuais = Meteor.user().roles;

        var papeis = window.prompt('Informe os papeis separados por vírgula:', papeisAtuais.join(', '));

        if (papeis) {
            Meteor.call('setUserRoles', userId, papeis.split(','), function(err){
                if (err)
                    throwError(err.reason);
            });
        }

    }
});