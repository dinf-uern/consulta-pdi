PdiPropostaAlteracaoSchema = new SimpleSchema({
    tipo: {
        type: String,
        min: 2
    },
    nodeId: {
        type: String,
        min: 2
    },
    descricao: {
        type: String,
        label: 'Descrição',
        min: 10
    },
    contatoId: {
        type: String,
        label: 'Contato',
        optional: true
    }
});

PdiPropostaAlteracaoSchema.messages({
    'required descricao': 'A descrição deve ser informada.',
    'minString descricao': 'A descrição deve ter pelo menos [min] caracteres.'
});