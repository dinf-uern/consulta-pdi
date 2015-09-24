PdiContatoPropostaSchema = new SimpleSchema({
    relacao: {
        type: String,
        label: 'relação',
        min: 2
    },
    nome: {
        type: String,
        label: 'nome',
        min: 2
    },
    email: {
        type: String,
        label: 'email',
        regEx: SimpleSchema.RegEx.Email
    }
});