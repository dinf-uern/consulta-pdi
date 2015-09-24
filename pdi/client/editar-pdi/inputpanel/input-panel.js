Template.inputPanel.onCreated(function(){
    Session.set('selectedParts', []);
});

Template.inputPanel.helpers({
    showParts: function(){
        var parts = Session.get('parts');
        return !!parts && parts.length > 0;
    }
})