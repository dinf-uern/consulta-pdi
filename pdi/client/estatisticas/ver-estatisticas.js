var ERRORS_KEY = 'verEstatisticasErrors';

Template.verEstatisticas.onCreated(function() {
    Session.set(ERRORS_KEY, {});
    var self = this;

    this.qtdPropostasUltimos7DiasData = {
        categories: new ReactiveVar([]),
        seriesData: new ReactiveVar([])

    };

    Meteor.call('qtdPropostasUltimos7Dias', function(err, data){
        var dates = _.map(data, function(item){
            return moment([item._id.ano, item._id.mes - 1, item._id.dia]).format('l');
        });

        self.qtdPropostasUltimos7DiasData.categories.set(dates);

        self.qtdPropostasUltimos7DiasData.seriesData.set(_.pluck(data, 'total'));
    });
});



Template.verEstatisticas.helpers({
    chartQtdPropostasUltimos7Dias: function() {
        var qtdPropostasUltimos7DiasData = Template.instance().qtdPropostasUltimos7DiasData;
        //console.log(qtdPropostasUltimos7DiasData);

        return {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false
            },
            title: {
                text: 'Propostas enviadas nos últimos 7 dias'
            },
            tooltip: {
                pointFormat: '<b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                        style: {
                            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                        },
                        connectorColor: 'silver'
                    }
                }
            },
            xAxis: {
                categories: qtdPropostasUltimos7DiasData.categories.get()
            },
            series: [{
                type: 'column',
                name: 'Propostas',
                data: qtdPropostasUltimos7DiasData.seriesData.get()
            }]
        }
    }
});


Template.verEstatisticas.onRendered(function(){
    var requestContato = Session.get('requestContato');

    if (requestContato)
        Modal.show('dlgIdentificacao', {redirect: 'verEstatisticas'});
});
