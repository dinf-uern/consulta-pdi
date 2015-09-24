Template.comboTopico.onCreated(function () {
    var self = this;
    this.topicoSelecionadoId = new ReactiveVar(null);
    this.subtopicos = new ReactiveVar([]);
    this.mostrarSubtopicos = new ReactiveVar(false);

    //limpar diretriz e meta selecionada
    Session.set('diretrizSelecionadaId', null);
    Session.set('metaSelecionadaId', null);

    Tracker.autorun(function(){
        var topicoSelecionadoId = self.topicoSelecionadoId.get();

        Meteor.subscribe('pdiSubnodes', topicoSelecionadoId, function(err){
            if (!err) {
                var subtopicos = PdiNodes.find({nodePaiId: topicoSelecionadoId, tipo: 'subtopico', temDiretriz: true}).fetch();
                self.subtopicos.set(subtopicos);
            }
        });
    })

    Tracker.autorun(function(){
        var topicoSelecionadoId = self.topicoSelecionadoId.get();
        var subtopicos = self.subtopicos.get();
        var result = false;

        if (topicoSelecionadoId && subtopicos.length > 0)
            result = true;

        self.mostrarSubtopicos.set(result);
    })
});

Template.comboTopico.events({
    'change #inputTopico': function(event, template){
        template.subtopicos.set([]);
        template.topicoSelecionadoId.set(event.target.value);
    }
})

Template.comboTopico.helpers({
    topicos: function(){
        return PdiNodes.find(
            {nodePaiId: {$exists: false}, temDiretriz: true}, {sort:{texto:1}}
        );
    },
    subtopicos: function(){
        return Template.instance().subtopicos.get();
    },
    mostrarSubtopicos: function(){
        return Template.instance().mostrarSubtopicos.get();
    }
})