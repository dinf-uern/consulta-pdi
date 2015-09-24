var ERRORS_KEY = 'entrarErrors';

Template.entrar.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.entrar.helpers({
    errorMessage: function(field) {
        return Session.get(ERRORS_KEY)[field];
    },
    errorClass: function (field) {
        return !!Session.get(ERRORS_KEY)[field] ? 'has-error' : '';
    }
});

Template.entrar.events({
  'submit': function(event, template) {
    event.preventDefault();
    
    var email = template.$('[name=email]').val();
    var senha = template.$('[name=senha]').val();
    
    var errors = {};

    if (! email) {
      errors.email = 'O email deve ser informado!';
    }

    if (! senha) {
      errors.senha = 'A senha deve ser informada!';
    }
    
    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }
    
    Meteor.loginWithPassword(email, senha, function(error) {
      if (error) {
        return throwError(error.reason);
      }

      Router.go('/');
    });
  }
});
