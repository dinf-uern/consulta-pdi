Template.metaItem.events({
    'click .btn-remover-meta': function(event, template){
        event.preventDefault();
        var data = Template.parentData();
        var metas = data.metas.get();
        var i = metas.indexOf(this);

        if (metas[i] && metas[i].acoes && metas[i].acoes.get().length > 0) {
            if (confirm('Todas as ações relacionadas serão perdidas. Deseja continuar?')) {
                metas.splice(i, 1);
            }
        } else {
            metas.splice(i, 1);
        }

        data.metas.set(metas);
    }
});

Template.metaItem.helpers({
    numeroMeta: function(){
        var metas = Template.parentData().metas.get();
        return metas.indexOf(this) + 1;
    }
})