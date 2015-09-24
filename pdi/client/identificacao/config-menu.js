function getNomeContato(){
    var result = '';
    var informacoesContato = Session.get('informacoesContato');

    if (informacoesContato) {
        var parts = informacoesContato.nome.split(' ');
        result = parts[0];
    }

    return result;
}

function limparContato(){
    Session.set('informacoesContato', null);
    Session.get('propostasEnviadasSemContato', []);
}

function abrirDlgIdentificacao(){
    var informacoesContato = Session.get('informacoesContato');
    Modal.show('dlgIdentificacao', informacoesContato);
}

var menuContatoIdentificado = new MenuItem({title: getNomeContato});
menuContatoIdentificado.add(new MenuItem({title:'limpar', action: limparContato}));
var menuContatoNaoIdentificado = new MenuItem({title:'Fornecer Contato', action: abrirDlgIdentificacao});

menuContatoIdentificado.canShow = function(){
    return !!Session.get('informacoesContato');
}

menuContatoNaoIdentificado.canShow = function(){
    return !Session.get('informacoesContato');
}

Menu.add(menuContatoIdentificado, 'right');
Menu.add(menuContatoNaoIdentificado, 'right');