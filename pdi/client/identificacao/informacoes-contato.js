Template.informacoesContato.helpers({
    identificado: function(){
        var informacoesContato = Session.get('informacoesContato');
        return !!informacoesContato;
    },
    primeiroNome: function(){
        var result = '';
        var informacoesContato = Session.get('informacoesContato');
        if (informacoesContato) {
            var parts = informacoesContato.nome.split(' ');
            result = parts[0];
        }

        return result;
    }
});

Template.informacoesContato.events({
    'click .btn-fornecer-contato': function(event, template){
        var informacoesContato = Session.get('informacoesContato');
        Modal.show('dlgIdentificacao', informacoesContato);
    },
    'click .btn-limpar': function(event, template){
        Session.set('informacoesContato', null);
        Session.get('propostasEnviadasSemContato', []);
    }
});