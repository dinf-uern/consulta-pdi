VerEstatisticasController = RouteController.extend({
    waitOn: function () {

    },
    data: function () {

    },
    action: function(){
        this.state.set('title', 'Estatísticas');
        this.render();
    }
});


Router.route('/estatisticas', {
    name: 'verEstatisticas'
});