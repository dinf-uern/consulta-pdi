Template.inputAcao.onCreated(function(){
    //console.log(this);
    this.validator = AcaoSchema.namedContext('validateAcao'+this.data.texto);

    this.validator.resetValidation();

    this.addAcao = function(acao){
        var acoes = this.data.acoes.get();

        if (!this.acaoJaAdicionada(acao))
            acoes.push(acao);

        this.data.acoes.set(acoes);
    }

    this.acaoJaAdicionada = function(acao){
        var acoes = this.data.acoes.get();
        return !!_.find(acoes, function(item){
            return acao.texto === item.texto;
        });
    }
});

Template.inputAcao.helpers({
    errorMessage: function(field) {
        return Template.instance().validator.keyErrorMessage(field);
    },
    errorClass: function(field) {
        return !!Template.instance().validator.keyErrorMessage(field)?'has-error':'';
    }
});

Template.inputAcao.events({
    'click .btn-incluir': function(event, template){
        event.preventDefault();

        var typedText = template.$('.inputAcao').val();
        var acao = {texto: typedText};

        AcaoSchema.clean(acao, {removeEmptyStrings: true});

        if (!template.validator.validate(acao))
            return;

        //if (typedText) {
        template.addAcao(acao);
        template.$('.inputAcao').val('');
        template.$('.inputAcao').focus();
        //}
    },
    'keydown .inputAcao, click .btn-incluir': function(event, template){
        var typedText = event.target.value;

        if (event.keyCode === 13) {
            event.preventDefault();

            var typedText = template.$('.inputAcao').val();
            var acao = {texto: typedText};

            AcaoSchema.clean(acao, {removeEmptyStrings: true});

            if (!template.validator.validate(acao))
                return;

            template.addAcao(acao);
            template.$(event.target).val('');
            template.$(event.target).focus();
        }
    }
});

