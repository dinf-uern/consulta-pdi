var menuProporAlteracao = new MenuItem({title: 'Propor Alteração', state:'enviarPropostaAlteracao'});
var menuProporInclusao = new MenuItem({title: 'Propor Inclusão'});
var menuGerenciar = new MenuItem({title: 'Gerenciar'}, ['pdi-admin']);
var menuEstatisticas = new MenuItem({title: 'Estatísticas', state: 'verEstatisticas'});
var menuDocumento = new MenuItem({title: 'Documento Original', side: 'left', link: 'https://drive.google.com/open?id=0BwVbrTaXFs-jMEY5amhXUnlqTzRmUjdrLVNtSGNhX0c0bExv', target:'_doc'});

Menu.add(menuProporAlteracao, 'left');
Menu.add(menuProporInclusao, 'left');
Menu.add(menuGerenciar, 'left');
Menu.add(menuEstatisticas, 'left');
Menu.add(menuDocumento, 'left');

menuProporInclusao.add(new MenuItem({title: 'Diretriz', state:'enviarPropostaInclusaoDiretriz'}));
menuProporInclusao.add(new MenuItem({title: 'Metas', state:'enviarPropostaInclusaoMetas'}));
menuProporInclusao.add(new MenuItem({title: 'Ações', state:'enviarPropostaInclusaoAcoes'}));

menuGerenciar.add(new MenuItem({title: 'Propostas', state:'gerenciarPropostas'}));