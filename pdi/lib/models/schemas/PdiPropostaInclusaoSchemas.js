AcaoSchema = new SimpleSchema({
    texto: {
        type: String,
        label: 'texto',
        min: 2
    }
});

AcaoSchema.messages({
    'required texto': 'Escreva o texto da ação',
    'minString texto': 'O texto da ação deve ter pelo menos [min] caracteres'
});

MetaSchema = new SimpleSchema({
    texto: {
        type: String,
        label: 'texto',
        min: 2
    },
    acoes: {
        type: [AcaoSchema],
        minCount: 1
    }
});

MetaSchema.messages({
    'required texto': 'Escreva o texto da meta',
    'minString texto': 'O texto da meta deve ter pelo menos [min] caracteres',
    'minCount acoes': 'Cada meta deve incluir pelo menos [min] ação'
});

DiretrizSchema = new SimpleSchema({
    texto: {
        type: String,
        label: 'texto',
        min: 2
    },
    metas: {
        type: [MetaSchema],
        minCount: 1
    }
});

DiretrizSchema.messages({
    'required texto': 'Escreva o texto da diretriz',
    'minString texto': 'O texto da diretriz deve ter pelo menos [min] caracteres',
    'minCount metas': 'A diretriz deve incluir pelo menos [min] meta'
});

PdiPropostaInclusaoBaseSchema = new SimpleSchema({
    tipo: {
        type: String,
        label: 'tipo',
        min: 2
    },
    subtipo: {
        type: String,
        label: 'subtipo',
        min: 2
    },
    nodeId: {
        type: String,
        label: 'meta',
        min: 2,
        optional: true
    },
    topicoId: {
        type: String,
        label: 'tópico',
        min: 2
    },
    subtopicoId: {
        type: String,
        label: 'subtópico',
        min: 2
    }
});

PdiPropostaInclusaoAcoesSchema = new SimpleSchema([PdiPropostaInclusaoBaseSchema, {
    diretrizId: {
        type: String,
        label: 'diretriz',
        min: 2
    },
    metaId: {
        type: String,
        label: 'meta',
        min: 2
    },
    acoes: {
        type: [AcaoSchema],
        label: 'acoes',
        minCount: 1
    }
}]);

PdiPropostaInclusaoAcoesSchema.messages({
    'required topicoId': 'Selecione o tópico',
    'required subtopicoId': 'Selecione os subtópicos',
    'required diretrizId': 'Selecione a diretriz',
    'required metaId': 'Selecione a meta',
    'required acoes': 'Informe as acoes',
    'minCount acoes': 'Inclua pelo menos [minCount] ação'
});

PdiPropostaInclusaoMetasSchema = new SimpleSchema([PdiPropostaInclusaoBaseSchema, {
    diretrizId: {
        type: String,
        label: 'diretriz',
        min: 2
    },
    metas: {
        type: [MetaSchema],
        label: 'metas',
        minCount: 1
    }
}]);

PdiPropostaInclusaoMetasSchema.messages({
    'required topicoId': 'Selecione o tópico',
    'required subtopicoId': 'Selecione os subtópicos',
    'required diretrizId': 'Selecione a diretriz',
    'required metas': 'Informe as metas',
    'minCount metas': 'Inclua pelo menos [minCount] meta',
    'minCount metas.$.acoes': 'Cada meta deve incluir pelo menos [minCount] ação'
});

PdiPropostaInclusaoDiretrizSchema = new SimpleSchema([PdiPropostaInclusaoBaseSchema, {
    diretriz: {
        type: DiretrizSchema,
        label: 'diretriz'
    }
}]);

PdiPropostaInclusaoDiretrizSchema.messages({
    'required topicoId': 'Selecione o tópico',
    'required subtopicoId': 'Selecione os subtópicos',
    'required diretriz.texto': 'Informe o texto da diretriz',
    'minString diretriz.texto': 'O texto da diretriz deve ter pelo menos [min] caracteres',
    'required diretriz.metas': 'Informe as metas',
    'minCount diretriz.metas': 'Inclua pelo menos [minCount] meta',
    'minCount diretriz.metas.$.acoes': 'Cada meta deve incluir pelo menos [minCount] ação'
});