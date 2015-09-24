Template.itemPart.helpers({
    selectedClass: function(){
        var self = this;

        var selectedParts = Session.get('selectedParts');
        var selectedItem = _.find(selectedParts, function(item){
            return item.index === self.index;
        });
        return !!selectedItem ?'selected':'';
    }
});

Template.itemPart.events({
    'click .item-part': function(e, template){
        e.preventDefault();

        console.log(e);

        var self = this;
        var selectedParts = Session.get('selectedParts');

        if (e.shiftKey) {
            var selectionRange = getSelectionRange(selectedParts, self);
            Session.set('selectedParts', selectionRange);
        } else {
            /*var selectedItem = _.find(selectedParts, function(item){
                return item.index === self.index;
            });

            if (!!selectedItem) {
                var i = selectedParts.indexOf(selectedItem);
                selectedParts.splice(i, 1);
            } else {
                selectedParts.push(self);
            }*/

            Session.set('selectedParts', [self]);
        }

    }
});

function getUltimaParteSelecionada(arr){
    var max = _.max(arr, function(item){
        return item.index;
    });
    return max;
}

function getPrimeiraParteSelecionada(arr){
    var min = _.min(arr, function(item){
        return item.index;
    });
    return min;
}

function getSelectionRange(selectedParts, clickedItem){
    var min, max;
    var parts = Session.get('parts');
    var primeiraParteSelecionada = getPrimeiraParteSelecionada(selectedParts);
    var ultimaParteSelecionada = getUltimaParteSelecionada(selectedParts);
    if (!!primeiraParteSelecionada && clickedItem.index > primeiraParteSelecionada.index){
        min = primeiraParteSelecionada.index;
        max = clickedItem.index;
    } else if (!!ultimaParteSelecionada) {
        min = clickedItem.index;
        max = ultimaParteSelecionada.index;
    }

    return _.filter(parts, function(item){
        return item.index >= min && item.index <= max;
    });
}