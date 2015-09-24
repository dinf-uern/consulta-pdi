var ERRORS_KEY = 'editarPerfilErrors';

Template.editarPerfil.onCreated(function() {
  Session.set(ERRORS_KEY, {});
});

Template.editarPerfil.helpers({
    errorMessage: function(field) {
        return Session.get(ERRORS_KEY)[field];
    },
    errorClass: function (field) {
        return !!Session.get(ERRORS_KEY)[field] ? 'has-error' : '';
    }
});

Template.editarPerfil.events({
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

      Router.go('home');
    });
  },
  'click .btn-escolher-midia': function(event, template){
    event.preventDefault();
    Modal.show('galeriaMidiasDlg');
  }
});

Template.editarPerfil.onRendered(function(){
    var options = {};
    options.template = '<div class="popover popover-tip" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>';
    options.trigger = 'focus';
    options.placement = 'right';
    options.html = true;

    this.$('[data-toggle="popover"]').popover(options);
});