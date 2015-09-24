Template.inputForm.onCreated(function(){
    console.log('criou o inputForm');
});

Template.inputForm.helpers({

});

Template.inputForm.events({
    'click .btn-carregar': function(event, template){
        event.preventDefault();
        var text = template.$('#inputTextarea').val();
        var arr = text.split(/\n/);
        var parts = [];
        _.each(arr, function(texto, i){
            parts.push({
                index: i,
                texto: texto.trim()
            });
        });

        Session.set('parts', parts);
    }
});