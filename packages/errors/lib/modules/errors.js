Errors = {
    // Local (client-only) collection
    collection: new Mongo.Collection(null),
    throw: function(message) {
        this.collection.insert({message: message, seen: false})
    },
    getAll: function(){
        return this.collection.find();
    },
    remove: function(messageId){
        this.collection.remove(messageId);
    }
};