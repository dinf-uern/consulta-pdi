Router.configure({
    waitOn: function(){
        return [Meteor.subscribe('pdiNodes')];
    },
    trackPageView: true
});

Router.route('/', {
    action: function(){
        Router.go('enviarPropostaAlteracao');
    }
});