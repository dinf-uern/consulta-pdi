Template.floatingBar.events({
    'click .btn-remove-selection': function(e, template){
        Session.set('selectedParts', []);
    },
    'click .btn-create-topico': function(e, template){
        var parts = Session.get('selectedParts');
        parts.forEach(function (item) {
            var doc = _.extend(_.omit(item, 'index'), {
                tipo: 'topico'
            });

            Meteor.call('addPdiNode', doc, function(err, docId){
                if (!err)
                    Session.set('selectedNodeId', docId);
            });
        })
        Session.set('selectedParts', []);
    },
    'click .btn-create-subtopico': function(e, template){
        var selectedNodeId = Session.get('selectedNodeId');
        var parts = Session.get('selectedParts');

        if (!parts || parts.length <= 0) {
            toastr.error('selecione as partes do texto');
            return;
        }

        if (!selectedNodeId) {
            toastr.error('selecione o node na estrutura');
            return;
        }



        parts.forEach(function (item) {
                var doc = _.extend(_.omit(item, 'index'), {
                    tipo: 'subtopico',
                    nodePaiId: selectedNodeId
                });


                Meteor.call('addPdiSubnode', doc, function (err, docId) {
                    if (!err)
                        Session.set('selectedNodeId', docId);
                });
            });

            Session.set('selectedParts', []);
    },
    'click .btn-create-paragrafos': function(e, template){
        var selectedNodeId = Session.get('selectedNodeId');
        if (selectedNodeId) {
            var parts = Session.get('selectedParts');

            parts.forEach(function (item) {
                var doc = _.extend(_.omit(item, 'index'), {
                    tipo: 'paragrafo',
                    nodePaiId: selectedNodeId
                });


                Meteor.call('addPdiSubnode', doc, function(err, docId){
                    //if (!err)
                    //Session.set('selectedNodeId', docId);
                });
            })

            Session.set('selectedParts', []);
        }
    },
    'click .btn-create-diretrizes': function(e, template){
        var selectedNodeId = Session.get('selectedNodeId');
        if (selectedNodeId) {
            var parts = Session.get('selectedParts');

            parts.forEach(function (item) {
                var doc = _.extend(_.omit(item, 'index'), {
                    tipo: 'diretriz',
                    nodePaiId: selectedNodeId
                });


                Meteor.call('addPdiSubnode', doc, function(err, docId){
                    //if (!err)
                    //Session.set('selectedNodeId', docId);
                });
            })

            Session.set('selectedParts', []);
        }
    },
    'click .btn-create-metas': function(e, template){
        var selectedNodeId = Session.get('selectedNodeId');
        if (selectedNodeId) {
            var parts = Session.get('selectedParts');

            parts.forEach(function (item) {
                var doc = _.extend(_.omit(item, 'index'), {
                    tipo: 'meta',
                    nodePaiId: selectedNodeId
                });


                Meteor.call('addPdiSubnode', doc, function(err, docId){
                    //if (!err)
                    //Session.set('selectedNodeId', docId);
                });
            })

            Session.set('selectedParts', []);
        }
    },
    'click .btn-create-acoes': function(e, template){
        var selectedNodeId = Session.get('selectedNodeId');
        if (selectedNodeId) {
            var parts = Session.get('selectedParts');

            parts.forEach(function (item) {
                var doc = _.extend(_.omit(item, 'index'), {
                    tipo: 'acao',
                    nodePaiId: selectedNodeId
                });


                Meteor.call('addPdiSubnode', doc, function(err, docId){
                    //if (!err)
                    //Session.set('selectedNodeId', docId);
                });
            })

            Session.set('selectedParts', []);
        }
    }
});