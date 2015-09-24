GerenciarPropostasController = RouteController.extend({
    waitOn: function(){
        return [
            Meteor.subscribe('contatosPropostas')
        ];
    },
    data: function(){
        var data = {};
        data.topicos = PdiNodes.find({nodePaiId: {$exists: false}}, {sort:{texto:1}});
        //console.log(data);
        return data;
    },
    action: function(){
        this.state.set('title', 'Gerenciar Propostas');
        this.render();
    }
});

Router.route('/gerenciar/propostas', {
    name: 'gerenciarPropostas'
});