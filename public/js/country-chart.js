jQuery.noConflict();
const ciudades = ['es-vi', 'es-ab', 'es-a', 'es-al', 'es-av', 'es-ba', 'es-pm',
    'es-b', 'es-bu', 'es-cc', 'es-ca', 'es-cs', 'es-cr', 'es-co', 'es-c',
    'es-cu', 'es-gi', 'es-gr', 'es-gu', 'es-ss', 'es-h', 'es-hu', 'es-j',
    'es-le', 'es-l', 'es-lo', 'es-lu', 'es-m', 'es-ma', 'es-mu', 'es-na',
    'es-or', 'es-o', 'es-p', 'es-gc', 'es-po', 'es-sa', 'es-tf', 'es-s',
    'es-sg', 'es-se', 'es-so', 'es-t', 'es-te', 'es-to', 'es-v', 'es-va',
    'es-bi', 'es-za', 'es-z', 'es-ce', 'es-ml'];
let data = [];
for (c of ciudades) {
    data.push({
        'hc-key': c,
        value: 0,
        parties: getParties(c, true),
        color: getColor(getParties(c, false))
    });
}
let options = {
    chart: {
        borderWidth: 1
    },

    title: {
        text: 'District distribution'
    },
    subtitle: {
        text: 'Check each district to show Results'
    },

    legend: {
        enabled: false
    },

    series: [{
        name: 'Country',
        mapData: Highcharts.maps['countries/es/es-all'],
        data: data,
        dataLabels: {
            enabled: true,
            color: '#FFFFFF',
            formatter: function () {
                if (this.point.value) {
                    return this.point.name;
                }
            }
        },
        tooltip: {
            useHTML: true,
            headerFormat: '',
            pointFormat: '<b>{point.name}</b><br>{point.parties}'
        }
    }]
};
function getParties(chartCode, isFormat) {
    for (let g of global) {
        if (g.cc === chartCode) {
            if (isFormat) {
                let string = '';
                for (let key in g.parties) {
                    string = string.concat(key + ': ' + g.parties[key] + '<br>');
                }
                return string;
            }
            return JSON.stringify(g.parties, null, 2);
        }
    }
}
function getColor(parties) {
    let mayor = {
        party: '',
        mandates: 0
    };

    if (parties !== undefined) {
        let ps = JSON.parse(parties);
        for (let key in ps) {
            if (parseInt(ps[key]) >= mayor.mandates) {
                mayor.party = key;
                mayor.mandates = ps[key];
            }
        }
        return variosMaximos(ps, mayor) || colors[mayor.party];
    } else {
        return 'UNDEFINED';
    }

}
function variosMaximos(ps, mayor) {
    let cont = 0;
    for (let key in ps)
        if (parseInt(ps[key]) === mayor.mandates)
            cont++;
    if (cont > 1) return '#cbff75';
    return false;
}
(function ($) {
    $(function () {
        $('#container').highcharts('Map', options);
    });
})(jQuery);
