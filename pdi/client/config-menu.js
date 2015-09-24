Menus.addMenuItem({title: 'Propor Alteração', state:'enviarPropostaAlteracao', side: 'left'});

Menus.addMenuItem({title: 'Propor Inclusão', side: 'left', submenus: [
    {title: 'Diretriz', state:'enviarPropostaInclusaoDiretriz'},
    {title: 'Metas', state:'enviarPropostaInclusaoMetas'},
    {title: 'Ações', state:'enviarPropostaInclusaoAcoes'}
]});

Menus.addMenuItem({title: 'Gerenciar', roles:['pdi-admin'], side: 'left', submenus: [
    {title: 'Propostas', state:'gerenciarPropostas'}
]});

Menus.addMenuItem({title: 'Estatísticas', side: 'left', state: 'verEstatisticas'});
Menus.addMenuItem({title: 'Documento Original', side: 'left', link: 'https://drive.google.com/open?id=0BwVbrTaXFs-jMEY5amhXUnlqTzRmUjdrLVNtSGNhX0c0bExv', target:'_doc'});