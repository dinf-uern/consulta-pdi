Template.acoesBox.helpers({
    acoes: function(){
        return this.acoes.get();
    }
});

Template.acoesBox.events({

});

Template.acoesBox.onCreated(function(){
    this.validate = function(){
        console.log(this);
        console.log(this.data);
        return this.data.acoes;
    }
});