PropostaBaseController = RouteController.extend({});

EnviarPropostaInclusaoDiretrizController = PropostaBaseController.extend({
    data: function(){

    },
    action: function(){
        this.state.set('title', 'Propor Inclusão de Diretriz');
        this.render();
    }
});
EnviarPropostaInclusaoMetasController = PropostaBaseController.extend({
    data: function(){

    },
    action: function(){
        this.state.set('title', 'Propor Inclusão de Metas');
        this.render();
    }
});

EnviarPropostaInclusaoAcoesController = PropostaBaseController.extend({
    data: function(){

    },
    action: function(){
        this.state.set('title', 'Propor Inclusão de Ações');
        this.render();
    }
});

Router.route('/propor/inclusao/diretriz', {
    data: function(){
        var data = {};
        data.metas = new ReactiveVar([]);
        return data;
    },
    name: 'enviarPropostaInclusaoDiretriz'
});

Router.route('/propor/inclusao/metas', {
    data: function(){
        var data = {};
        data.metas = new ReactiveVar([]);
        return data;
    },
    name: 'enviarPropostaInclusaoMetas'
});

Router.route('/propor/inclusao/acoes', {
    data: function(){
        var data = {};
        data.acoes = new ReactiveVar([]);
        return data;
    },
    name: 'enviarPropostaInclusaoAcoes'
});