var ERRORS_KEY = 'criarContaErrors';

Template.criarConta.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.criarConta.helpers({
    errorMessage: function(field) {
        return Session.get(ERRORS_KEY)[field];
    },
    errorClass: function (field) {
        return !!Session.get(ERRORS_KEY)[field] ? 'has-error' : '';
    }
});

Template.criarConta.events({
  'submit': function(event, template) {
    event.preventDefault();
    var email = template.$('[name=email]').val();
    var senha = template.$('[name=senha]').val();
    var confirm = template.$('[name=confirm]').val();

    var errors = {};

    if (!email) {
      errors.email = 'Informe o email!';
    }

    if (!senha) {
      errors.senha = 'Digite a senha!';
    }

    if (!confirm) {
      errors.confirm = 'Digite a senha novamente!';
    }

    if (confirm !== senha) {
      errors.confirm = 'As senhas não coincidem!';
    }

    Session.set(ERRORS_KEY, errors);
    if (_.keys(errors).length) {
      return;
    }

    Accounts.createUser({
      email: email,
      password: senha
    }, function(error) {
      if (error) {
        return throwError(error.reason);
      }

      Router.go('/');
    });
  }
});
