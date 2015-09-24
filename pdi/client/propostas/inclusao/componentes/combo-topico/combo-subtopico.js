Template.comboSubtopico.onCreated(function () {
    var self = this;
    this.topicoSelecionadoId = new ReactiveVar(null);
    this.subtopicos = new ReactiveVar([]);

    Session.set('diretrizSelecionadaId', null);
    Session.set('metaSelecionadaId', null);

    Tracker.autorun(function(){
        var topicoSelecionadoId = self.topicoSelecionadoId.get();
        Session.set('subtopicoAtualId', topicoSelecionadoId);
        Meteor.subscribe('pdiSubnodes', topicoSelecionadoId, function(err){
            if (!err) {
                var subtopicos = PdiNodes.find({nodePaiId: topicoSelecionadoId, tipo: 'subtopico', temDiretriz: true}).fetch();
                self.subtopicos.set(subtopicos);
            }
        });
    })
});

Template.comboSubtopico.events({
    'change #inputSubtopico': function(event, template){
        var inputNivel = template.$(event.target).attr('data-nivel');

        Session.set('diretrizSelecionadaId', null);
        Session.set('metaSelecionadaId', null);

        if (parseInt(inputNivel) === parseInt(template.data.nivel)) {
            template.subtopicos.set([]);
            template.topicoSelecionadoId.set(event.target.value);
        }
    }
})

Template.comboSubtopico.helpers({
    proximoNivel: function(){
        return this.nivel + 1;
    },
    items: function(){
        console.log(this);
        return this.subtopicos;
    },
    subtopicos: function(){
        return Template.instance().subtopicos.get();
    },
    mostrarSubtopicos: function(){
        var subtopicos = Template.instance().subtopicos.get();
        return subtopicos.length > 0 && Template.instance().topicoSelecionadoId.get();
    }
})