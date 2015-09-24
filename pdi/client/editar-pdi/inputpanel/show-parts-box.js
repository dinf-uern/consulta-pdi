Template.showPartsBox.helpers({
    parts: function(){
        return Session.get('parts');
    }
});

Template.showPartsBox.events({
    'click .btn-limpar': function(event, template){
        event.preventDefault();
        Session.set('parts', null);
    }
});