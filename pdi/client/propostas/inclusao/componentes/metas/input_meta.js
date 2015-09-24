Template.inputMeta.onCreated(function(){
    this.schema = MetaSchema.pick(['texto']);
    this.validator = this.schema.namedContext('validateMeta'+this.data.texto);

    //this.data.meta = new

    this.addMeta = function(meta){
        var metas = this.data.metas.get();

        if (!this.metaJaAdicionada(meta))
            metas.push(meta);

        this.data.metas.set(metas);
    }

    this.metaJaAdicionada = function(meta){
        var metas = this.data.metas.get();
        return !!_.find(metas, function(item){
            return meta.texto === item.texto;
        });
    }
});

Template.inputMeta.helpers({
    errorMessage: function(field) {
        return Template.instance().validator.keyErrorMessage(field);
    },
    errorClass: function(field) {
        return !!Template.instance().validator.keyErrorMessage(field)?'has-error':'';
    }
});

Template.inputMeta.events({
    'click .btn-incluir': function(event, template){
        event.preventDefault();

        var typedText = template.$('.inputMeta').val();
        var meta = {texto: typedText};

        template.schema.clean(meta, {removeEmptyStrings: true});

        if (!template.validator.validate(meta))
            return;

        meta.acoes = new ReactiveVar([]);

        template.addMeta(meta);

        template.$('.inputMeta').val('');
        template.$('.inputMeta').focus();
    },
    'keydown .inputMeta': function(event, template){
        var typedText = event.target.value;

        if (event.keyCode === 13) {
            event.preventDefault();

            var typedText = template.$('.inputMeta').val();
            var meta = {texto: typedText};

            template.schema.clean(meta, {removeEmptyStrings: true});

            if (!template.validator.validate(meta))
                return;

            meta.acoes = new ReactiveVar([]);

            template.addMeta(meta);

            template.$('.inputMeta').val('');
            template.$('.inputMeta').focus();
        }
    }
});