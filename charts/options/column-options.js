
module.exports = {
    chart: {
        type: 'column',
        backgroundColor: null,
        style: {
            fontFamily: 'Signika, serif',
            background: 'url(/images/sand.png)'
        }
    },
    title: {
        text: 'District result',
        style: {
            color: 'black',
            fontSize: '16px',
            fontWeight: 'bold'
        }
    },
    subtitle: {
        text: 'Mandates by parties',
        style: {
            color: 'black'
        }
    },
    xAxis: {
        categories: null,
        allowDecimals: false,
        crosshair: true,
        labels: {
            style: {
                color: '#6e6e70'
            }
        }

    },
    yAxis: {
        min: 0,
        title: {
            text: 'Mandates'
        },
        allowDecimals: false,
        labels: {
            style: {
                color: '#6e6e70'
            }
        }
    },
    tooltip: {
        valueSuffix: ' mandates',
        pointFormat: '{point.y}',
        shared: true
    },
    plotOptions: {
        series: {
            shadow: true
        },
        candlestick: {
            lineColor: '#404048'
        },
        map: {
            shadow: false
        },
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }

    },
    legend: {
        enabled: false
    },
    credits: {
        enabled: false
    },
    series: [{
        name: 'Mandates',
        data: null
    }],
    background2: '#E0E0E8'
};