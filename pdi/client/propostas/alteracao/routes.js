EnviarPropostaAlteracaoController = RouteController.extend({
    waitOn: function(){
    },
    data: function(){
        var data = {};
        data.topicos = PdiNodes.find({nodePaiId: {$exists: false}, tipo: "topico"}, {sort:{texto:1}});
        return data;
    },
    action: function(){
        this.state.set('title', 'Propor Alteracao');
        this.render();
    }
});

Router.route('/propor/alteracao', {
    name: 'enviarPropostaAlteracao'
});