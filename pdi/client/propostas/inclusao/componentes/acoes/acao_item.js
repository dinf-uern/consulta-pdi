Template.acaoItem.events({
    'click .btn-remover-acao': function(event, template){
        event.preventDefault();
        var meta = Template.parentData();
        var acoes = meta.acoes.get();
        var i = acoes.indexOf(this);
        acoes.splice(i, 1);
        meta.acoes.set(acoes);
    }
});

Template.acaoItem.helpers({
    numeroAcao: function(){
        var meta = Template.parentData();
        var acoes = meta.acoes.get();
        return acoes.indexOf(this) + 1;
    }
})