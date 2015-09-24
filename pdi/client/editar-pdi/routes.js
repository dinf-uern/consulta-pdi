EditarPdiController = RouteController.extend({
    waitOn: function(){
        return [
            Meteor.subscribe('pdiNodes')
        ]
    },
    data: function(){
        var data = {};
        data.nodes = PdiNodes.find({nodePaiId: {$exists: false}});
        return data;
    }
});

Router.route('/pdi/editar', {
    name: 'editarPdi'
});