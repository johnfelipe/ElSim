let pieChartOptions = {
    exporting: {
        chartOptions: { 
            plotOptions: {
                series: {
                    dataLabels: {
                        enabled: true
                    }
                }
            }
        },
        fallbackToExportServer: false
    },
    chart: {
        type: 'pie',
        style: {
            fontFamily: 'Signika, serif',
            background: 'url(/images/sand.png)'
        }
    },
    title: {
        text: 'Results',
        align: 'center',
        verticalAlign: 'top',
        y: 20
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.y}</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            depth: 35,
            dataLabels: {
                enabled: true,
                connectorColor: 'silver'
            },
            startAngle: -90,
            endAngle: 90,
            center: ['50%', '75%']
        }
    },
    series: [{
        name: 'Mandates ',
        innerSize: '0%',
        data: null
    }]
};

module.exports = pieChartOptions;