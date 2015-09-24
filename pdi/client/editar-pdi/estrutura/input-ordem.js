Template.inputOrdem.helpers({

});

Template.inputOrdem.events({
    'click .btn-subir': function(event, template){
        Meteor.call('subirNode', this._id);
    },
    'click .btn-descer': function(event, template){
        Meteor.call('descerNode', this._id);
    }
});