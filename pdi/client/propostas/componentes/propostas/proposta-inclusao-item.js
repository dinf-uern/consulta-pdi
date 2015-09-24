Template.propostaInclusaoItem.helpers({
    isInclusaoDeDiretriz: function(){
        return this.subtipo === 'diretriz';
    },
    isInclusaoDeMetas: function(){
        return this.subtipo === 'metas';
    },
    isInclusaoDeAcoes: function(){
        return this.subtipo === 'acoes';
    }
});

Template.propostaInclusaoItem.events({});