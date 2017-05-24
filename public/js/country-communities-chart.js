jQuery.noConflict();
const ciudades = ['es-vi', 'es-ab', 'es-a', 'es-al', 'es-av', 'es-ba', 'es-pm',
    'es-b', 'es-bu', 'es-cc', 'es-ca', 'es-cs', 'es-cr', 'es-co', 'es-c',
    'es-cu', 'es-gi', 'es-gr', 'es-gu', 'es-ss', 'es-h', 'es-hu', 'es-j',
    'es-le', 'es-l', 'es-lo', 'es-lu', 'es-m', 'es-ma', 'es-mu', 'es-na',
    'es-or', 'es-o', 'es-p', 'es-gc', 'es-po', 'es-sa', 'es-tf', 'es-s',
    'es-sg', 'es-se', 'es-so', 'es-t', 'es-te', 'es-to', 'es-v', 'es-va',
    'es-bi', 'es-za', 'es-z', 'es-ce', 'es-ml'];

let data = [];

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
            pointFormat: '<b>{point.properties.region}</b><br>{point.parties}'
        }
    }]
};

const sortByPartyValue = (a, b) => {
    let tmpKeysA = Object.keys(a);
    let tmpKeysB = Object.keys(b);
    if (a[tmpKeysA[0]] > b[tmpKeysB[0]]) {
        return -1;
    } else if (a[tmpKeysA[0]] < b[tmpKeysB[0]]) {
        return 1;
    } else {
        return 0;
    }
};

const objectToArray = (array) => {
    let aux = [];
    let gKeys = Object.keys(array);
    for (let gKey of gKeys) {
        let tmpObject = {};
        tmpObject[gKey] = array[gKey];
        aux.push(tmpObject);
    }
    return aux;
};

const getParties = (chartCode, isFormat) => {
    for (let community in global.agrupado) {
        if (global.agrupado[community].provincias.includes(chartCode)) {
            if (isFormat) {
                let string = '';

                let aux = objectToArray(global.agrupado[community].resultadoFinal.parties).sort(sortByPartyValue);

                for (let a of aux) {
                    let subKeys = Object.keys(a);
                    string = string.concat(subKeys[0] + ': ' + a[subKeys[0]] + '<br>');
                }
                return string;
            }
            return JSON.stringify(global.agrupado[community].resultadoFinal.parties, null, 2);
        }
    }
};

const getColor = (parties) => {
    let mayor = {
        party: '',
        mandates: 0
    };

    if (parties !== undefined) {
        let ps = JSON.parse(parties);

        let keys = Object.keys(ps);

        for (let key of keys) {
            if (parseInt(ps[key]) >= mayor.mandates) {
                mayor.party = key;
                mayor.mandates = ps[key];
            }
        }

        return variosMaximos(ps, mayor) || colors[mayor.party];
    } else {
        return 'UNDEFINED';
    }

};

const variosMaximos = (ps, mayor) => {
    let cont = 0;
    for (let key in ps)
        if (parseInt(ps[key]) === mayor.mandates)
            cont++;
    if (cont > 1) return '#cbff75';
    return false;
};

for (let c of ciudades) {
    data.push({
        'hc-key': c,
        value: 0,
        parties: getParties(c, true),
        color: getColor(getParties(c, false))
    });
}

(function ($) {
    $(function () {
        $('#container').highcharts('Map', options);
    });
})(jQuery);
